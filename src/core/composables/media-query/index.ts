// @ts-nocheck

import {DOCUMENT} from '@angular/common';
import {Signal, computed, effect, inject, signal} from '@angular/core';

import {MaybeSignal, wrapSignal} from '../../basics/daowexhy';

export function useMediaQuery(
	//
	query: MaybeSignal<string>,
): Signal<boolean>;

export function useMediaQuery(query) {
	let document = inject(DOCUMENT, {optional: true});
	let $query = wrapSignal(query);
	// todo: rename
	let inccvbcx$ = computed(() => {
		// todo
		let window = document.defaultView;
		let query = $query();
		return window.matchMedia(query);
	});
	// todo: rename
	let cynvbmtf = signal({});
	effect((onCleanup) => {
		let inccvbcx = inccvbcx$();
		((target, event, listener) => {
			target.addEventListener(event, listener);
			onCleanup(() => {
				target.removeEventListener(event, listener);
			});
		})(inccvbcx, 'change', () => cynvbmtf.set({}));
	});
	return computed(() => {
		cynvbmtf();
		let inccvbcx = inccvbcx$();
		return inccvbcx.matches;
	});
}
