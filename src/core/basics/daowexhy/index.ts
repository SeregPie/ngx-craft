// todo: rename folder

import {computed, ElementRef, isSignal, Signal} from '@angular/core';

export type MaybeSignal<T> = T | Signal<T>;

export function unwrapSignal<const T>(
	//
	v: MaybeSignal<T>,
): T {
	return isSignal(v) ? v() : v;
}

export function wrapSignal<const T>(
	//
	v: MaybeSignal<T>,
): Signal<T> {
	return computed(() => unwrapSignal(v));
}

export type MaybeElementSignal<T> = MaybeSignal<T | ElementRef<T>>;

export function unwrapElementSignal<const T>(
	//
	v: MaybeElementSignal<T>,
): T {
	v = unwrapSignal(v);
	return v instanceof ElementRef ? v.nativeElement : v;
}

export function wrapElementSignal<const T>(
	//
	v: MaybeElementSignal<T>,
): Signal<T> {
	return computed(() => unwrapElementSignal(v));
}
