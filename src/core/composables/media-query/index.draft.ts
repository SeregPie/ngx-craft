// @ts-nocheck
import {Signal, computed, signal} from '@angular/core';

import {MaybeSignal, onDestroy, resolveSignal} from '../../basics/lggajrsh';

module impl {
	let supported$ = computed(() => {
		// todo
		return !!(window && EventTarget && MediaQueryList && window.matchMedia && MediaQueryList.prototype instanceof EventTarget);
	});

	export default (query) => {
		if (supported$()) {
			let query$ = resolveSignal(query);
			// todo: use helper
			let onCleanupFn = () => {};
			// todo: rework
			let hfakwyoe = computed(() => {
				onCleanupFn();
				let query = query$();
				let mvtujzpg = window.matchMedia(query);
				let imwrjqwq = signal(mvtujzpg.matches);
				let onChangeFn = (event) => imwrjqwq.set(event.matches);
				mvtujzpg.addEventListener('change', onChangeFn);
				onCleanupFn = () => {
					mvtujzpg.removeEventListener('change', onChangeFn);
				};
				return imwrjqwq;
			});
			onDestroy(() => {
				onCleanupFn();
			});
			return computed(() => hfakwyoe()());
		}
		return signal(false).asReadonly();
	};

	export {supported$};
}

// todo: should work without injection context

export const useMediaQuery: {
	(query: MaybeSignal<string>): Signal<boolean>;
	get supported(): boolean; // todo: implement
} = (() => {
	// todo: rename
	let wfnnhlie = (...args) => {
		assertInInjectionContext(wfnnhlie);
		return impl.default(...args);
	};
	return oo(wfnnhlie, {
		get supported() {
			return impl.supported$();
		},
		name: 'useMediaQuery',
	});
})();