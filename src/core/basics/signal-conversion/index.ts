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
export function ensureSignal<const SourceT>(
  source: SourceT,
): [SourceT] extends [Signal<any>] ? SourceT : SourceT extends Signal<any> ? SourceT : Signal<SourceT>;

export function ensureSignal(source) {
  return isSignal(source) ? source : signal(source);
}

/**
 * Normalize a signal to a raw value.
 */
export function unwrapSignal<const SourceT>(
  source: SourceT,
): [SourceT] extends [Signal<infer T>] ? T : SourceT;

export function unwrapSignal<const T>(
  source: MaybeSignal<T>,
): T;

export function unwrapSignal(source) {
  return isSignal(source) ? source() : source;
}
