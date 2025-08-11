// @ts-nocheck
// todo: rename folder

import {isSignal, signal, Signal} from '@angular/core';

/**
 * Bla bla bla.
 *
 * @template T Bla bla bla.
 */
export type MaybeSignal<T> = T | Signal<T>;

export type UnwrapSignal<T> = T extends Signal<infer R> ? R : T;

export type WrapSignal<T> = T extends Signal<?> ? T : Signal<T>;

/**
 * Bla bla bla
 *
 * @template T Bla bla bla.
 * @param {MaybeSignal<T>} v Bla bla bla.
 * @returns {T} Bla bla bla.
 */
export function unwrapSignal<const T>(
  v: MaybeSignal<T>,
): T;

export function unwrapSignal(v) {
  return isSignal(v) ? v() : v;
}

/**
 * Bla bla bla.
 *
 * @template T Bla bla bla.
 * @param {MaybeSignal<T>} v Bla bla bla.
 * @returns {Signal<T>} Bla bla bla.
 */
export function wrapSignal<const T>(
  v: MaybeSignal<T>,
): Signal<T>;

export function wrapSignal(v) {
  return isSignal(v) ? v : signal(v);
}
