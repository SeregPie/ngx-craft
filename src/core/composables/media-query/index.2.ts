// @ts-nocheck

import {DOCUMENT} from '@angular/common';
import {computed, effect, inject, signal, Signal} from '@angular/core';

import {MaybeSignal, wrapSignal} from '../../basics/daowexhy';

export function useMediaQuery(
	query: MaybeSignal<string>,
): Signal<boolean>;

export const useMediaQuery = (() => {
	const createProxy = (document, query) => {
		if (document != null) {
			let window = document.defaultView;
			if (window != null) {
				if (window.matchMedia != null) {
					let media = window.matchMedia(query);

				}
			}
		}
		return {
			gggg(fn) {
				return () => {};
			},
			get result() {

			},
		}
	};

	return (query) => {
		// todo
		let document = inject(DOCUMENT, {optional: true});
		let query$ = wrapSignal(query);
		// todo: rename
		let inccvbcx$ = computed(() => {
			let window = document.defaultView;
			let query = query$();
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
	};
})();
