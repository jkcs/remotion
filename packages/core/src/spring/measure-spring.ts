import {validateFps} from '../validation/validate-fps.js';
import type {SpringConfig} from './spring-utils';
import {springCalculation} from './spring-utils.js';

const cache = new Map<string, number>();

/**
 * @description The function returns how long it takes for a spring animation to settle
 * @see [Documentation](https://www.remotion.dev/docs/measure-spring)
 */
export function measureSpring({
	fps,
	config = {},
	threshold = 0.005,
	from = 0,
	to = 1,
}: {
	fps: number;
	config?: Partial<SpringConfig>;
	threshold?: number;
	from?: number;
	to?: number;
}): number {
	if (typeof threshold !== 'number') {
		throw new TypeError(
			`threshold must be a number, got ${threshold} of type ${typeof threshold}`,
		);
	}

	if (threshold === 0) {
		return Infinity;
	}

	if (threshold === 1) {
		return 0;
	}

	if (isNaN(threshold)) {
		throw new TypeError('Threshold is NaN');
	}

	if (!Number.isFinite(threshold)) {
		throw new TypeError('Threshold is not finite');
	}

	if (threshold < 0) {
		throw new TypeError('Threshold is below 0');
	}

	const cacheKey = [
		fps,
		config.damping,
		config.mass,
		config.overshootClamping,
		config.stiffness,
		from,
		to,
		threshold,
	].join('-');
	if (cache.has(cacheKey)) {
		return cache.get(cacheKey)!;
	}

	validateFps(fps, 'to the measureSpring() function', false);

	const range = Math.abs(from - to);
	let frame = 0;
	let finishedFrame = 0;
	const calc = () => {
		return springCalculation({
			fps,
			frame,
			config,
			from,
			to,
		});
	};

	let animation = calc();
	const calcDifference = () => {
		return (
			Math.abs(animation.current - animation.toValue) /
			(range === 0 ? 1 : range)
		);
	};

	let difference = calcDifference();
	while (difference >= threshold) {
		frame++;
		animation = calc();
		difference = calcDifference();
	}

	// Since spring is bouncy, just because it's under the threshold we
	// cannot be sure it's done. We need to animate further until it stays in the
	// threshold for, say, 20 frames.
	finishedFrame = frame;
	for (let i = 0; i < 20; i++) {
		frame++;
		animation = calc();
		difference = calcDifference();
		if (difference >= threshold) {
			i = 0;
			finishedFrame = frame + 1;
		}
	}

	cache.set(cacheKey, finishedFrame);

	return finishedFrame;
}
