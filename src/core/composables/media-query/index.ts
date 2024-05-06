// @ts-nocheck

import {Signal, computed, signal} from '@angular/core';

import {MaybeSignal, onDestroy, resolveSignal} from '../../basics/lggajrsh';

// todo: should work without injection context

export const useMediaQuery: {
	(query: MaybeSignal<string>): Signal<boolean>;
	get supported(): boolean; // todo: implement
} = (query) => {
	let {window} = globalThis;
	if (!window) {
		return signal(false).asReadonly();
	}
	let query$ = resolveSignal(query);
	// todo: use helper
	let onCleanupFn = () => {};
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
};
