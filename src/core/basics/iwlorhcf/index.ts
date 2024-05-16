import {EffectCleanupRegisterFn, ElementRef, Signal, computed, isSignal, signal} from '@angular/core';

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
