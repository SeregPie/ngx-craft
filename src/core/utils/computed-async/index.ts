// @ts-nocheck

import {
	CreateComputedOptions,
	EffectCleanupRegisterFn,
	Signal,
	computed,
	effect,
	signal,
} from '@angular/core';

import {hfsmwvzm} from '../../basics/xnozleer';

export type CreateComputedAsyncOptions<T> = CreateComputedOptions<T> &
	Partial<{
		initialValue: T;
		lazy: boolean;
	}>;

export interface ComputedAsyncRef<T> extends Signal<Promise<T>> {
	get pending(): boolean;
}

export const computedAsync: {
	<T>(
		fn: {(onCleanup: EffectCleanupRegisterFn): Promise<T>},
		options: CreateComputedAsyncOptions<T> & {initialValue: T},
	): ComputedAsyncRef<T>;
	<T>(
		fn: {(onCleanup: EffectCleanupRegisterFn): Promise<T>},
		options?: CreateComputedAsyncOptions<undefined | T>,
	): ComputedAsyncRef<undefined | T>;
} = (fn, {initialValue, ...options} = {}) => {
	let injector = hfsmwvzm();
	let rwfgnjaq$ = signal(() => initialValue);
	let pending$ = signal(false);
	effect(
		async (onCleanup) => {
			let aborted = false;
			onCleanup(() => {
				aborted = true;
				pending$.set(false);
			});
			try {
				if (!aborted) {
					pending$.set(true);
				}
				let value = await fn(onCleanup);
				if (!aborted) {
					rwfgnjaq$.set(() => value);
				}
			} catch (error) {
				if (!aborted) {
					rwfgnjaq$.set(() => {
						throw error;
					});
				}
			} finally {
				if (!aborted) {
					pending$.set(false);
				}
			}
		},
		{
			allowSignalWrites: true,
			injector,
		},
	);
	return Object.create(
		computed(() => rwfgnjaq$()(), options),
		{
			pending: {
				configurable: true,
				get: () => pending$(),
			},
			[Symbol.toStringTag]: {
				configurable: true,
				value: 'ComputedAsyncRef',
			},
		},
	);
};
