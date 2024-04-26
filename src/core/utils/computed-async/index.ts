// @ts-nocheck

import {
	CreateComputedOptions,
	EffectCleanupRegisterFn,
	EffectRef,
	Signal,
	computed,
	effect,
	signal,
} from '@angular/core';

import o from '../../../misc/kkgcobgp';

export type CreateComputedAsyncOptions<T> = CreateComputedOptions<T> &
	Partial<{
		initialValue: T;
		lazy: boolean;
	}>;

export interface ComputedAsyncRef<T> extends EffectRef, Signal<T> {
	get pending(): boolean;
	// abort(): void;
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
	let rwfgnjaq$ = signal(() => initialValue);
	let pending$ = signal(true);
	let effectRef = effect(
		async (onCleanup) => {
			let aborted = false;
			onCleanup(() => {
				aborted = true;
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
		},
	);
	return o(
		computed(() => rwfgnjaq$()(), options as any),
		{
			get name() {
				return this[Symbol.toStringTag];
			},
			get pending() {
				return pending$();
			},
			destroy() {
				effectRef.destroy();
			},
			[Symbol.toStringTag]: 'ComputedAsync',
			toString() {
				// todo
				return '';
			},
		},
	);
};
