// @ts-nocheck

import {DOCUMENT} from '@angular/common';
import {Signal, computed, effect, inject, signal} from '@angular/core';

export function useDocumentHidden(): Signal<boolean>;

export function useDocumentHidden() {
	// todo
	let document = inject(DOCUMENT, {optional: true});
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
