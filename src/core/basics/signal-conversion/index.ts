// @ts-nocheck

import {isSignal, signal} from '@angular/core';
import type {Signal} from '@angular/core';

export type MaybeSignal<T> = T | Signal<T>;

export type EnsureSignal<T> = Extract<T, Signal<unknown>> | (Exclude<T, Signal<unknown>> extends never ? never : Signal<Exclude<T, Signal<unknown>>>);

export type UnwrapSignal<T> = T extends Signal<infer R> ? R : T;

export function ensureSignal<const T>(
  input: T,
): EnsureSignal<T>;

export function ensureSignal(input) {
  return isSignal(input) ? input : signal(input).asReadonly();
}

export function unwrapSignal<const T>(
  input: T,
): UnwrapSignal<T>;

export function unwrapSignal(input) {
  return isSignal(input) ? input() : input;
}
