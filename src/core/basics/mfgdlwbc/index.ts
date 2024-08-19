// todo: rename folder

import {DestroyRef, inject, Injector, INJECTOR} from '@angular/core';

export const getCurrentInjector: {
	(): undefined | Injector;
} = () => {
	try {
		let injector = inject(INJECTOR);
		if (injector instanceof Injector) {
			return injector;
		}
	} catch {}
};

export const isInInjectionContext: {
	(): boolean;
} = () => getCurrentInjector() != null;

export const onDestroy: {
	(fn: {(): void}): {(): void};
} = (fn) => inject(DestroyRef).onDestroy(fn);
