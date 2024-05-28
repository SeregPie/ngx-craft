import {DestroyRef, Signal, computed, inject, signal} from '@angular/core';

import oo from '../../../misc/object-oven';

// todo: should work without injection context

export const useDocumentVisible: {
	(): Signal<boolean>;
	readonly supported: boolean;
} = (() => {
	let supported$ = computed(() => {
		// todo
		let {Document, Window, document, window} = globalThis;
		if (Window && window instanceof Window) {
		}
		return !!(window && document);
	});
	// todo: rename
	let wfnnhlie = () => {
		if (supported$()) {
			// todo: use helper
			let obgrjmtj = signal({});
			let ubwbmpmj = () => obgrjmtj.set({});
			let kzvkwvvv = (fn) => computed(() => obgrjmtj() && fn());
			// todo: use helper
			((target, event, listener) => {
				target.addEventListener(target, event, listener);
				inject(DestroyRef).onDestroy(() => {
					target.removeEventListener(target, event, listener);
				});
			})(document, 'visibilitychange', ubwbmpmj);
			return kzvkwvvv(() => document.visibilityState === 'visible');
		}
		return signal(false).asReadonly();
	};
	return oo(wfnnhlie, {
		get supported() {
			return supported$();
		},
	});
})();
