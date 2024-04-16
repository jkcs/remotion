export type {TRenderAsset} from './CompositionManager';
export type {ClipRegion} from './NativeLayers';
export {
	EasingFunction,
	ExtrapolateType,
	InterpolateOptions,
	interpolate,
} from './interpolate';
export {RandomSeed, random} from './random.js';
export type {VideoConfig} from './video-config';
import {
	DELAY_RENDER_CALLSTACK_TOKEN,
	DELAY_RENDER_RETRIES_LEFT,
	DELAY_RENDER_RETRY_TOKEN,
} from './delay-render';
import {
	deserializeJSONWithCustomFields,
	serializeJSONWithDate,
} from './input-props-serialization';
import {colorNames, processColor} from './interpolate-colors';
import {truthy} from './truthy';
import {ENABLE_V5_BREAKING_CHANGES} from './v5-flag';
import {validateFrame} from './validate-frame';
import {validateDefaultAndInputProps} from './validation/validate-default-props';
import {validateDimension} from './validation/validate-dimensions';
import {validateDurationInFrames} from './validation/validate-duration-in-frames';
import {validateFps} from './validation/validate-fps';
import {getExpectedMediaFrameUncorrected} from './video/get-current-time';
import {getOffthreadVideoSource} from './video/offthread-video-source';

export const NoReactInternals = {
	processColor,
	truthy,
	validateFps,
	validateDimension,
	validateDurationInFrames,
	validateDefaultAndInputProps,
	validateFrame,
	serializeJSONWithDate,
	bundleName: 'bundle.js',
	bundleMapName: 'bundle.js.map',
	deserializeJSONWithCustomFields,
	DELAY_RENDER_CALLSTACK_TOKEN,
	DELAY_RENDER_RETRY_TOKEN,
	DELAY_RENDER_ATTEMPT_TOKEN: DELAY_RENDER_RETRIES_LEFT,
	getOffthreadVideoSource,
	getExpectedMediaFrameUncorrected,
	ENABLE_V5_BREAKING_CHANGES,
	MIN_NODE_VERSION: ENABLE_V5_BREAKING_CHANGES ? 18 : 16,
	MIN_BUN_VERSION: ENABLE_V5_BREAKING_CHANGES ? '1.1.3' : '1.0.3',
	colorNames,
};
