// @ts-nocheck

import {DestroyRef, Signal, computed, inject, signal} from '@angular/core';

import oo from '../../../misc/object-oven';

// todo: should work without injection context
// todo: MaybeSignal

export const useMediaQuery: {
	(query: string): Signal<boolean>;
	readonly supported: boolean;
} = (() => {
	// todo
	let {EventTarget, MediaQueryList, window} = globalThis;
	let supported = !!(window && window.matchMedia && MediaQueryList && EventTarget);
	// todo: rename
	let wfnnhlie = (query) => {
		if (supported) {
			// todo: rename
			let test = window.matchMedia(query);
			// todo: use helper
			let change$ = signal({});
			// todo: use helper
			((target, event, listener) => {
				// todo: check if needed
				if (target instanceof EventTarget) {
					target.addEventListener(event, listener);
					inject(DestroyRef).onDestroy(() => {
						target.removeEventListener(event, listener);
					});
				} else {
					target.addListener(event, listener);
					inject(DestroyRef).onDestroy(() => {
						target.removeListener(event, listener);
					});
				}
			})(test, 'change', () => change$.set({}));
			return computed(() => {
				change$();
				return test.matches;
			});
		}
		return signal(false).asReadonly();
	};
	return oo(wfnnhlie, {
		supported,
	});
})();
