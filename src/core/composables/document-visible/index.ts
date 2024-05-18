import {DestroyRef, Signal, computed, inject, signal} from '@angular/core';

import oo from '../../../misc/object-oven';

// todo: should work without injection context

export const useDocumentVisible: {
	(): Signal<boolean>;
	get supported(): boolean;
} = (() => {
	let supported$ = computed(() => {
		// todo
		let {document, window} = globalThis;
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
			{
				let controller = new AbortController();
				let {signal} = controller;
				document.addEventListener('visibilitychange', ubwbmpmj, {signal});
				inject(DestroyRef).onDestroy(() => controller.abort());
			}
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
