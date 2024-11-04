// todo: rename folder

import {computed, ElementRef, isSignal, Signal} from '@angular/core';

export type MaybeSignal<T> = T | Signal<T>;

export const unwrapSignal: {
	<const T>(v: MaybeSignal<T>): T;
} = (v) => (isSignal(v) ? v() : v);

export const wrapSignal: {
	<const T>(v: MaybeSignal<T>): Signal<T>;
} = (v) => computed(() => unwrapSignal(v));

export type MaybeElementSignal<T> = MaybeSignal<T | ElementRef<T>>;

export const unwrapElementSignal: {
	<const T>(v: MaybeElementSignal<T>): T;
} = (v) => ((v) => (v instanceof ElementRef ? v.nativeElement : v))(unwrapSignal(v));

export const wrapElementSignal: {
	<const T>(v: MaybeElementSignal<T>): Signal<T>;
} = (v) => computed(() => unwrapElementSignal(v));
