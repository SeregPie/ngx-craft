// todo: rename folder

import {assertInInjectionContext, DestroyRef, inject, Injector, INJECTOR} from '@angular/core';

export function getCurrentInjector(): undefined | Injector {
	try {
		return inject(INJECTOR);
	} catch {}
}

export function isInInjectionContext(): boolean {
	try {
		assertInInjectionContext(isInInjectionContext);
		return true;
	} catch {}
	return false;
}

export function onDestroy(fn: {(): void}): void {
	try {
		inject(DestroyRef).onDestroy(fn);
	} catch {}
}
