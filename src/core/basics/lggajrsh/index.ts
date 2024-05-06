import {DestroyRef, ElementRef, Signal, computed, inject, isSignal, signal} from '@angular/core';

export const onDestroy: {
	(fn: {(): void}): void;
} = (fn) => {
	let ref = inject(DestroyRef, {optional: true});
	if (ref) {
		ref.onDestroy(fn);
	}
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
