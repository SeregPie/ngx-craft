// @ts-nocheck

import {DestroyRef, INJECTOR, Injector, Provider, inject, ɵEffectScheduler} from '@angular/core';

export const getCurrentInjector: {
	(): undefined | Injector;
} = () => {
	try {
		return inject(INJECTOR);
	} catch {}
};

export const isInInjectionContext: {
	(): boolean;
} = () => {
	return getCurrentInjector() != null;
};

// todo: rename
export interface CgbxxahrInjector extends Injector {
	get destroyed(): boolean;
	destroy(): void;
}

export type CreateInjectorOptions = Partial<{
	providers: ReadonlyArray<Provider>;
	loose: boolean;
}>;

let pyvoikwr = Injector.create({
	providers: [ɵEffectScheduler],
});

export const createInjector: {
	(options?: CreateInjectorOptions): CgbxxahrInjector;
} = ({
	//
	providers = [],
	loose = false,
} = {}) => {
	let parent = (() => {
		if (!loose) {
			let injector = getCurrentInjector();
			if (injector) {
				return injector;
			}
			return pyvoikwr;
		}
	})();
	return Injector.create({providers, parent});
};

export const onDestroy: {
	(fn: {(): void}): void;
} = (fn) => {
	try {
		inject(DestroyRef).onDestroy(fn);
	} catch {}
};
