import {Signal, computed, signal} from '@angular/core';

import oo from '../../../misc/object-oven';
import {MaybeSignal, resolveSignal} from '../../basics/iwlorhcf';
import {dfgdxkxi} from '../../utils/dfgdxkxi';
import {withAbortSignal} from '../../utils/with-abort-signal';

// todo: should work without injection context

export const useMediaQuery: {
	(query: MaybeSignal<string>): Signal<boolean>;
	get supported(): boolean; // todo: implement
} = (() => {
	let supported$ = computed(() => {
		let {EventTarget, MediaQueryList, window} = globalThis;
		// prettier-ignore
		return !!(true
			&& EventTarget && MediaQueryList && window
			&& window.matchMedia
			&& MediaQueryList.prototype instanceof EventTarget
		);
	});
	// todo: rename
	let wfnnhlie = (query) => {
		if (supported$()) {
			let query$ = resolveSignal(query);
			// todo
			let kkk = signal;
			return dfgdxkxi(
				withAbortSignal((signal) => {
					let query = query$();
					let test = window.matchMedia(query);
					let changes$ = kkk({});
					test.addEventListener('change', () => changes$.set({}), {signal});
					return computed(() => {
						changes$();
						return test.matches;
					});
				}),
			);
		}
		return signal(false).asReadonly();
	};
	return oo(wfnnhlie, {
		get supported() {
			return supported$();
		},
	});
})();
