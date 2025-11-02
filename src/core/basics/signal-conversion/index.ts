// @ts-nocheck

import {isSignal, signal} from '@angular/core';
import type {Signal} from '@angular/core';

/**
 * A raw value or a signal.
 */
export type MaybeSignal<T> = T | Signal<T>;

/**
 * Normalize a raw value to a signal.
 */
export function ensureSignal<const T>(
  value: MaybeSignal<T>,
): Signal<T>;

export function ensureSignal<const T>(
  value: T,
): [T] extends [Signal<any>] ? T : T extends Signal<any> ? T : Signal<T>;

export function ensureSignal(value) {
  return isSignal(value) ? value : signal(value);
}

/**
 * Normalize a signal to a raw value.
 */
export function unwrapSignal<const T>(
  value: MaybeSignal<T>,
): T;

export function unwrapSignal<const T>(
  value: T,
): T extends Signal<infer R> ? R : T;

export function unwrapSignal(value) {
  return isSignal(value) ? value() : value;
}
