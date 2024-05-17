// @ts-nocheck

import {CreateComputedOptions, DestroyRef, EffectCleanupFn, EffectCleanupRegisterFn, ElementRef, INJECTOR, Injector, Provider, Signal, computed, inject, isSignal, signal, ɵEffectScheduler} from '@angular/core';

export const reactify: {
	<T>(target: T): T;
} = (target) => {
	return target;
};

export const dfgdxkxi: {
	<T>(
		//
		fn: {(onCleanup: EffectCleanupFn): Signal<T>},
		options?: CreateComputedOptions<T>,
	): Signal<T>;
} = (fn, options) => {
	// todo
	throw '';
};

export type MaybeSignal<T> = T | Signal<T>;

export const resolveSignal: {
	<T>(v: MaybeSignal<T>): Signal<T>;
} = (v) => (isSignal(v) ? v : signal(v).asReadonly());

export type MaybeElementSignal<T> = MaybeSignal<T | ElementRef<T>>;

export const resolveElementSignal: {
	<T>(v: MaybeElementSignal<T>): Signal<T>;
} = (v) => {
	let v$ = resolveSignal(v);
	return computed(() => {
		let v = v$();
		if (v instanceof ElementRef) {
			return v.nativeElement;
		}
		return v;
	});
};

export const toAbortSignal: {
	(fn: EffectCleanupRegisterFn): AbortSignal;
} = (fn) => {
	let controller = new AbortController();
	fn(() => controller.abort());
	return controller.signal;
};

export const withAbortSignal: {
	<T>(fn: {(signal: AbortSignal): T}): {(onCleanup: EffectCleanupRegisterFn): T};
} = (fn) => (onCleanup) => fn(toAbortSignal(onCleanup));

/*
export const withPreviousValue: {
	<T>(fn: {(value: undefined | T): T}): {(): T};
	<T>(fn: {(value: T): T}, value: T): {(): T};
} = (fn, value) => () => (value = fn(value));
*/

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
