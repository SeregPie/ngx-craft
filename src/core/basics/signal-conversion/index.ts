// @ts-nocheck

import {isSignal, signal} from '@angular/core';
import type {Signal} from '@angular/core';

/**
 * A raw value or a signal.
 */
export type MaybeSignal<T> = T | Signal<T>;

export type EnsureSignal<T> =
  // If it's already a Signal, return as-is
  T extends Signal<unknown> ? T
    // If it's a union, map each branch
    : T extends infer U ? Signal<UnwrapSignal<U>>
    // Otherwise, just wrap it
    : Signal<UnwrapSignal<T>>;

export type UnwrapSignal<T> = T extends Signal<infer R> ? R : T;

/**
 * Normalize a raw value to a signal.
 */
export function ensureSignal<const T>(
  input: T,
): EnsureSignal<T>;

export function ensureSignal(input) {
  return isSignal(input) ? input : signal(input);
}

/**
 * Normalize a signal to a raw value.
 */
export function unwrapSignal<const T>(
  input: T,
): UnwrapSignal<T>;

export function unwrapSignal(input) {
  return isSignal(input) ? input() : input;
}
