import {DestroyRef, Signal, computed, inject, signal} from '@angular/core';

import oo from '../../../misc/object-oven';

let {document, window} = globalThis;

// todo: should work without injection context

export const useDocumentHidden: {
	(): Signal<boolean>;
	readonly supported: boolean;
} = (() => {
	// todo
	let supported = !!(window && document);
	// todo: rename
	let wfnnhlie = () => {
		if (supported) {
			// todo: use helper
			let change$ = signal({});
			// todo: use helper
			((target, event, listener) => {
				target.addEventListener(event, listener);
				inject(DestroyRef).onDestroy(() => {
					target.removeEventListener(event, listener);
				});
			})(document, 'visibilitychange', () => change$.set({}));
			return computed(() => {
				change$();
				return document.hidden;
			});
		}
		return signal(false).asReadonly();
	};
	return oo(wfnnhlie, {
		supported,
	});
})();
