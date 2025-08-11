// @ts-nocheck
// todo: rename folder

import {isSignal, signal, Signal, WritableSignal} from '@angular/core';

// todo: needed?
export type SignalValue<T extends Signal<any>> = T extends Signal<infer R> ? R : never;

/**
 * Bla bla bla.
 *
 * @template T Bla bla bla.
 */
export type MaybeSignal<T> = T | Signal<T>;

// todo: needed?
export type UnwrapSignal<T> = T extends Signal<any> ? SignalValue<T> : T;

// todo: needed?
export type WrapSignal<T> = T extends Signal<any> ? T : Signal<T>;

/**
 * Bla bla bla.
 *
 * @template T Bla bla bla.
 * @param source Bla bla bla.
 * @returns Bla bla bla.
 */
export function ensureSignal<const T extends Signal<any>>(
  source: T,
): T;

export function ensureSignal<const T>(
  source: T,
): WritableSignal<T>;

export function ensureSignal(source) {
  return isSignal(source) ? source : signal(source);
}

/**
 * Bla bla bla
 *
 * @template T Bla bla bla.
 * @param source Bla bla bla.
 * @returns Bla bla bla.
 */
export function unwrapSignal<const T>(
  source: MaybeSignal<T>,
): T;

export function unwrapSignal(source) {
  return isSignal(source) ? source() : source;
}
