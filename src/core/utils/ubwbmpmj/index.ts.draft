import {computed, signal} from '@angular/core';

// todo: rename
// todo: rework
export const ubwbmpmj: {
	(): {
		track: {(): void};
		tracked: typeof computed;
		notify: {(): void};
	};
} = () => {
	// todo: rename
	let obgrjmtj = signal({});
	let track = () => {
		obgrjmtj();
	};
	let notify = () => {
		obgrjmtj.set({});
	};
	return {
		track,
		tracked: (fn, options) => {
			return computed(() => {
				track();
				return fn();
			}, options);
		},
		notify,
	};
};
