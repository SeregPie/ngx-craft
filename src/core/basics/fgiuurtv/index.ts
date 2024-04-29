import {Signal, isSignal, signal} from '@angular/core';

export type MaybeSignal<T> = T | Signal<T>;

export const resolveSignal: {
	<T>(v: MaybeSignal<T>): Signal<T>;
} = (v) => (isSignal(v) ? v : signal(v).asReadonly());
