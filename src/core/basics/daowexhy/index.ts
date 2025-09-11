// @ts-nocheck
// todo: rename folder

import {isSignal, signal, Signal} from '@angular/core';

/**
 * A type that can be either a value of type T or a Signal containing a value of type T.
 *
 * @template T The type of the value or signal.
 */
export type MaybeSignal<T> = T | Signal<T>;

/**
 * Unwraps a MaybeSignal to extract the value. If the input is a Signal, it calls the signal function
 * to retrieve the value. Otherwise, it returns the value directly.
 *
 * @template T The type of the value contained within the MaybeSignal.
 * @param {MaybeSignal<T>} v The MaybeSignal value to unwrap.
 * @returns {T} The value inside the Signal, or the value itself if it was not a Signal.
 */
export function unwrapSignal<const T>(
	//
	v: MaybeSignal<T>,
): T;

export function unwrapSignal(v) {
	return isSignal(v) ? v() : v;
}

/**
 * Wraps a value in a Signal. If the input is already a Signal, it is returned as is. Otherwise,
 * it creates a new Signal wrapping the value.
 *
 * @template T The type of the value to be wrapped in a Signal.
 * @param {MaybeSignal<T>} v The value or Signal to wrap.
 * @returns {Signal<T>} A Signal wrapping the value.
 */
export function wrapSignal<const T>(
	//
	v: MaybeSignal<T>,
): Signal<T>;

export function wrapSignal(v) {
	return isSignal(v) ? v : signal(v);
}
