// todo: rename folder

import {DestroyRef, inject, Injector, INJECTOR} from '@angular/core';

export const getCurrentInjector: {
	(): undefined | Injector;
} = () => {
	try {
		return inject(INJECTOR);
	} catch {}
};

export const isInInjectionContext: {
	(): boolean;
} = () => getCurrentInjector() != null;

export const onDestroy: {
	(fn: {(): void}): {(): void};
} = (fn) => {
	if (isInInjectionContext()) {
		inject(DestroyRef).onDestroy(fn);
	}
};
