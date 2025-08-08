// @ts-nocheck
// todo: rename folder

import {isSignal, signal, Signal} from '@angular/core';

/**
 * Bla bla bla.
 *
 * @template T Bla bla bla.
 */
export type MaybeSignal<T> = T | Signal<T>;

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

export const unwrapSignal = (v) => (isSignal(v) ? v() : v);

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

export const wrapSignal = (v) => (isSignal(v) ? v : signal(v));
