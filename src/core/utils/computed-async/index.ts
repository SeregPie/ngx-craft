import {CreateComputedOptions, EffectCleanupRegisterFn, Signal, computed, signal, untracked} from '@angular/core';

import oo from '../../../misc/object-oven';

// prettier-ignore
export type CreateComputedAsyncOptions<T> = (
	& CreateComputedOptions<T>
	& Partial<{
		initialValue: T;
	}>
);

// prettier-ignore
export interface ComputedAsyncRef<T>
	extends Signal<T>
{
	get pending(): boolean;
}

// todo: should work without injection context

export const computedAsync: {
	<T>(
		//
		fn: {(onCleanup: EffectCleanupRegisterFn): Promise<T>},
		options: CreateComputedAsyncOptions<T> & {initialValue: T},
	): ComputedAsyncRef<T>;
	<T>(
		//
		fn: {(onCleanup: EffectCleanupRegisterFn): Promise<T>},
		options?: CreateComputedAsyncOptions<undefined | T>,
	): ComputedAsyncRef<undefined | T>;
} = (fn, {initialValue, ...options}) => {
	let brctjohx = signal(() => initialValue);
	let pending$ = signal(false);
	let ozlopcdq = computed(async () => {
		try {
			untracked(() => {
				pending$.set(true);
			});
			let value = await fn(onCleanup);
			untracked(() => {
				brctjohx.set(() => value);
			});
		} catch (error) {
			untracked(() => {
				brctjohx.set(() => {
					throw error;
				});
			});
		} finally {
			untracked(() => {
				pending$.set(false);
			});
		}
	});
	let hoatvmvp = computed(() => {
		ozlopcdq();
		return brctjohx();
	});
	let gpvoqnhf = computed(() => brctjohx()(), options);
	return oo(gpvoqnhf, {
		get name() {
			return this[Symbol.toStringTag];
		},
		get pending() {
			return pending$();
		},
		[Symbol.toStringTag]: 'ComputedAsyncRef', // todo: Ref in name?
		toString,
	});
};
