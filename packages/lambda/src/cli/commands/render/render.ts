import {CliInternals} from '@remotion/cli';
import {downloadVideo} from '../../../api/download-video';
import {getRenderProgress} from '../../../api/get-render-progress';
import {renderVideoOnLambda} from '../../../api/render-video-on-lambda';
import {
	BINARY_NAME,
	DEFAULT_FRAMES_PER_LAMBDA,
	DEFAULT_MAX_RETRIES,
	DEFAULT_OUTPUT_PRIVACY,
	LambdaRoutines,
} from '../../../shared/constants';
import {sleep} from '../../../shared/sleep';
import {validatePrivacy} from '../../../shared/validate-privacy';
import {validateMaxRetries} from '../../../shared/validate-retries';
import {parsedLambdaCli} from '../../args';
import {getAwsRegion} from '../../get-aws-region';
import {findFunctionName} from '../../helpers/find-function-name';
import {formatBytes} from '../../helpers/format-bytes';
import {getCloudwatchStreamUrl} from '../../helpers/get-cloudwatch-stream-url';
import {quit} from '../../helpers/quit';
import {Log} from '../../log';
import {makeMultiProgressFromStatus, makeProgressString} from './progress';

export const RENDER_COMMAND = 'render';

export const renderCommand = async (args: string[]) => {
	const serveUrl = args[0];
	if (!serveUrl) {
		Log.error('No serve URL passed.');
		Log.info(
			'Pass an additional argument specifying a URL where your Remotion project is hosted.'
		);
		Log.info();
		Log.info(`${BINARY_NAME} ${RENDER_COMMAND} <serve-url> <composition-id>`);
		quit(1);
	}

	const composition = args[1];
	if (!composition) {
		Log.error('No composition ID passed.');
		Log.info('Pass an additional argument specifying the composition ID.');
		Log.info();
		// TODO: Rename serveURL
		Log.info(`${BINARY_NAME} ${RENDER_COMMAND} <serve-url> <composition-id>`);
		quit(1);
	}

	const outName = args[2] ?? null;

	// TODO: Further validate serveUrl

	const cliOptions = await CliInternals.getCliOptions({
		type: 'series',
		isLambda: true,
	});

	const functionName = await findFunctionName();

	const region = getAwsRegion();

	const maxRetries = parsedLambdaCli['max-retries'] ?? DEFAULT_MAX_RETRIES;
	validateMaxRetries(maxRetries);

	const privacy = parsedLambdaCli.privacy ?? DEFAULT_OUTPUT_PRIVACY;
	validatePrivacy(privacy);
	const res = await renderVideoOnLambda({
		functionName,
		serveUrl,
		inputProps: cliOptions.inputProps,
		codec: cliOptions.codec as 'h264-mkv' | 'mp3' | 'aac' | 'wav',
		imageFormat: cliOptions.imageFormat,
		crf: cliOptions.crf ?? undefined,
		envVariables: cliOptions.envVariables,
		pixelFormat: cliOptions.pixelFormat,
		proResProfile: cliOptions.proResProfile,
		quality: cliOptions.quality,
		region,
		maxRetries,
		composition,
		framesPerLambda: cliOptions.framesPerLambda ?? DEFAULT_FRAMES_PER_LAMBDA,
		privacy,
		logLevel: cliOptions.logLevel,
		enableChunkOptimization: !parsedLambdaCli['disable-chunk-optimization'],
		frameRange: cliOptions.frameRange ?? undefined,
	});

	const totalSteps = outName ? 5 : 4;

	const progressBar = CliInternals.createOverwriteableCliOutput();

	Log.info(
		CliInternals.chalk.gray(
			`Bucket = ${res.bucketName}, renderId = ${res.renderId}, functionName = ${functionName}`
		)
	);
	Log.verbose(
		`CloudWatch logs (if enabled): ${getCloudwatchStreamUrl({
			functionName,
			region,
			renderId: res.renderId,
			method: LambdaRoutines.renderer,
		})}`
	);
	const status = await getRenderProgress({
		functionName,
		bucketName: res.bucketName,
		renderId: res.renderId,
		region: getAwsRegion(),
	});
	const multiProgress = makeMultiProgressFromStatus(status);
	progressBar.update(
		makeProgressString({
			progress: multiProgress,
			errors: status.errors,
			steps: totalSteps,
			downloadInfo: null,
			retriesInfo: status.retriesInfo,
		})
	);

	for (let i = 0; i < 3000; i++) {
		await sleep(1000);
		const newStatus = await getRenderProgress({
			functionName,
			bucketName: res.bucketName,
			renderId: res.renderId,
			region: getAwsRegion(),
		});
		const newProgress = makeMultiProgressFromStatus(newStatus);
		progressBar.update(
			makeProgressString({
				progress: newProgress,
				steps: totalSteps,
				errors: newStatus.errors,
				retriesInfo: newStatus.retriesInfo,
				downloadInfo: null,
			})
		);

		//	Log.info(newStatus);
		if (newStatus.done) {
			progressBar.update(
				makeProgressString({
					progress: newProgress,
					steps: totalSteps,
					downloadInfo: null,
					errors: newStatus.errors,
					retriesInfo: newStatus.retriesInfo,
				})
			);
			if (outName) {
				const downloadStart = Date.now();
				const {outputPath, sizeInBytes} = await downloadVideo({
					bucketName: res.bucketName,
					outPath: outName,
					region: getAwsRegion(),
					renderId: res.renderId,
					onProgress: ({downloaded, totalSize}) => {
						progressBar.update(
							makeProgressString({
								progress: newProgress,
								steps: totalSteps,
								errors: newStatus.errors,
								retriesInfo: newStatus.retriesInfo,
								downloadInfo: {
									doneIn: null,
									downloaded,
									totalSize,
								},
							})
						);
					},
				});
				progressBar.update(
					makeProgressString({
						progress: newProgress,
						steps: totalSteps,
						errors: newStatus.errors,
						retriesInfo: newStatus.retriesInfo,
						downloadInfo: {
							doneIn: Date.now() - downloadStart,
							downloaded: sizeInBytes,
							totalSize: sizeInBytes,
						},
					})
				);
				Log.info();
				Log.info();
				Log.info('Done!', outputPath, formatBytes(sizeInBytes));
			} else {
				Log.info();
				Log.info();
				Log.info('Done! ' + newStatus.outputFile);
			}

			Log.info(
				`${newStatus.renderMetadata?.estimatedTotalLambdaInvokations} λ's used, Estimated cost $${newStatus.costs.displayCost}`
			);

			quit(0);
		}

		if (newStatus.fatalErrorEncountered) {
			Log.error('\n');
			for (const err of newStatus.errors) {
				const attemptString = `(Attempt ${err.attempt}/${err.totalAttempts})`;
				if (err.chunk === null) {
					Log.error('Error occured while preparing video: ' + attemptString);
				} else {
					Log.error(`Error occurred when rendering chunk ${err.chunk}:`);
				}

				if (err.explanation) {
					Log.error(err.explanation);
				}

				Log.error(err.stack);
			}

			Log.error('Fatal error encountered. Exiting.');
			quit(1);
		}
	}
};
