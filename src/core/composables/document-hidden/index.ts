// @ts-nocheck

import {DOCUMENT} from '@angular/common';
import {computed, effect, inject, signal, Signal} from '@angular/core';

export function useDocumentHidden(): Signal<boolean>;

export function useDocumentHidden() {
	// todo
	let document = inject(DOCUMENT, {optional: true});
	if (document == null) {
		return;
	}
	if (document.hidden)
	// todo: rename
	let cynvbmtf = signal({});
	effect((onCleanup) => {
		((target, event, listener) => {
			target.addEventListener(event, listener);
			onDispose(() => {
				target.removeEventListener(event, listener);
			});
		})(document, 'visibilitychange', () => cynvbmtf.set({}));
	});
	return computed(() => {
		cynvbmtf();
		return document.hidden;
	});
}
