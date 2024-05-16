// @ts-nocheck

import {DestroyRef, Signal, computed, signal} from '@angular/core';

import oo from '../../../misc/object-oven';
import {MaybeSignal, resolveSignal} from '../../basics/iwlorhcf';

// todo: should work without injection context

export const useMediaQuery: {
	(query: MaybeSignal<string>): Signal<boolean>;
	get supported(): boolean;
} = (() => {
	let supported$ = computed(() => {
		let {EventTarget, MediaQueryList, window} = globalThis;
		// prettier-ignore
		return !!(true
			&& window
			&& window.matchMedia
			&& EventTarget
			&& MediaQueryList
			&& MediaQueryList.prototype instanceof EventTarget
		);
	});
	// todo: rename
	let wfnnhlie = (query) => {
		if (supported$()) {
			let query$ = resolveSignal(query);
			let obgrjmtj = computed(() => {
				let query = query$();
				let test = window.matchMedia(query);
				let obgrjmtj = signal({});
				let ubwbmpmj = () => obgrjmtj.set({});
				let kzvkwvvv = (fn) => computed(() => obgrjmtj() && fn());
				{
					let controller = new AbortController();
					let {signal} = controller;
					test.addEventListener('change', ubwbmpmj, {signal});
					onCleanup(() => controller.abort());
				}
				return kzvkwvvv(() => test.matches);
			});
			let onDestroyFn;
			inject(DestroyRef).onDestroy(onDestroyFn);
			let registry = new FinalizationRegistry(onDestroyFn);
			registry.register(obgrjmtj);
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
