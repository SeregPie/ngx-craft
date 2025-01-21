// todo: rename folder

import {computed, ElementRef, Signal} from '@angular/core';

import {unwrapSignal} from '../daowexhy';

// todo: rename
export type MaybeElementSignal<T extends Element = Element> = undefined | null | T | ElementRef<T> | Signal<MaybeElementSignal<T>>;

// todo: rename
export function unwrapElementSignal<const T extends Element>(
	//
	v: MaybeElementSignal<T>,
): undefined | T {
	v = unwrapSignal(v);
	if (v instanceof ElementRef) {
		v = v.nativeElement;
	}
	if (v != null) {
		return v;
	}
}

// todo: rename
export function wrapElementSignal<const T extends Element>(
	//
	v: MaybeElementSignal<T>,
): Signal<undefined | T> {
	return computed(() => unwrapElementSignal(v));
}

export function wrapElementSignal(v) {
	return computed(() => unwrapElementSignal(v));
}

// todo: rename
// todo
export type MaybeElementsSignal<T extends Element = Element> = MaybeElementSignal<T> | ReadonlyArray<MaybeElementsSignal<T>>;

// todo: rename
export function unwrapElementsSignal<const T extends Element>(
	//
	v: MaybeElementsSignal<T>,
): Array<T>;

export function unwrapElementsSignal(v) {
	// todo
	let result = [];
	let recur = (v) => {
		v = unwrapSignal(v);
		if (Array.isArray(v)) {
			v.forEach((v) => recur(v));
		} else {
			if (v instanceof ElementRef) {
				v = v.nativeElement;
			}
			if (v != null) {
				result.push(v);
			}
		}
	};
	recur(v);
	return result;
}

// todo: rename
export function wrapElementsSignal<const T extends Element>(
	//
	v: MaybeElementsSignal<T>,
): Signal<Array<T>>;

export function wrapElementsSignal(v) {
	return computed(() => unwrapElementsSignal(v));
}
