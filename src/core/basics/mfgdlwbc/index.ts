// todo: rename folder

import {inject, Injector, INJECTOR} from '@angular/core';

export function getCurrentInjector(): undefined | Injector {
	try {
		return inject(INJECTOR);
	} catch {}
}

export function isInInjectionContext(): boolean {
	return getCurrentInjector() != null;
}
