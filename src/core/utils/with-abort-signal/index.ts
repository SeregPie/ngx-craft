import {EffectCleanupRegisterFn} from '@angular/core';

export const toAbortSignal: {
	(fn: EffectCleanupRegisterFn): AbortSignal;
} = (fn) => {
	let controller = new AbortController();
	fn(() => controller.abort());
	let {signal} = controller;
	return signal;
};

export const withAbortSignal: {
	<T>(fn: {(signal: AbortSignal): T}): {(onCleanup: EffectCleanupRegisterFn): T};
} = (fn) => (onCleanup) => fn(toAbortSignal(onCleanup));

export const withPreviousValue: {
	<T>(fn: {(value: undefined | T): T}): {(): T};
	<T>(fn: {(value: T): T}, value: T): {(): T};
} = (fn, value) => () => (value = fn(value));
