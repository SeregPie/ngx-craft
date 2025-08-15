// todo: rename folder

import {Signal, isSignal, signal} from '@angular/core';

/**
 * Bla bla bla.
 * @template T Bla bla bla.
 */
export type MaybeSignal<T> = T | Signal<T>;

/**
 * Bla bla bla.
 * @template T Bla bla bla.
 * @param source Bla bla bla.
 * @returns Bla bla bla.
 */
export function ensureSignal<const T>(
  source: MaybeSignal<T>,
): Signal<T>;

// @ts-ignore
export function ensureSignal(source) {
  return isSignal(source) ? source : signal(source);
}

/**
 * Bla bla bla
 * @template T Bla bla bla.
 * @param source Bla bla bla.
 * @returns Bla bla bla.
 */
export function unwrapSignal<const T>(
  source: MaybeSignal<T>,
): T;

// @ts-ignore
export function unwrapSignal(source) {
  return isSignal(source) ? source() : source;
}
