import {DestroyRef, Injector, Signal, computed, inject, signal} from '@angular/core';

import oo from '../../../misc/object-oven';
import {resolveSignal} from '../../drafts';

// todo: should work without injection context

export const useMediaQuery: {
	(query: MaybeSignal<string>): Signal<boolean>;
	get supported(): boolean;
} = (() => {
	let supported$ = computed(() => {
		// todo
		let {EventTarget, MediaQueryList, window} = globalThis;
		return !!(window && window.matchMedia && EventTarget && MediaQueryList && MediaQueryList.prototype instanceof EventTarget);
	});
	// todo: rename
	let wfnnhlie = (query) => {
		if (supported$()) {
			let query$ = resolveSignal(query);
			// todo: use helper
			let injector = inject(Injector);
			let obgrjmtj = computed(() => {
				let query = query$();
				let test = window.matchMedia(query);
				let obgrjmtj = signal({});
				let ubwbmpmj = () => obgrjmtj.set({});
				let kzvkwvvv = (fn) => computed(() => obgrjmtj() && fn());
				// todo: use helper
				((target, event, listener) => {
					target.addEventListener(target, event, listener);
					inject(DestroyRef).onDestroy(() => {
						target.removeEventListener(target, event, listener);
					});
				})(test, 'change', ubwbmpmj);
				return kzvkwvvv(() => test.matches);
			});
			return computed(() => obgrjmtj()());
		}
		return signal(false).asReadonly();
	};
	return oo(wfnnhlie, {
		get supported() {
			return supported$();
		},
	});
})();
