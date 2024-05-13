// @ts-nocheck

import {CreateComputedOptions, EffectCleanupRegisterFn, Signal, assertInInjectionContext} from '@angular/core';

// prettier-ignore
export type CreateComputedAsyncOptions<T> = (
	& CreateComputedOptions<T>
	& Partial<{
		initialValue: T;
		lazy: boolean; // todo: is needed?
	}>
);

// prettier-ignore
export interface ComputedAsyncRef<T>
	extends Signal<T>
{
	get pending(): boolean;
	abort(): void; // todo: is needed?
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
} = () => {
	let wfnnhlie = (fn, {initialValue, ...options}) => {
		assertInInjectionContext(wfnnhlie);
		return oo(undefined, {
			name: 'ComputedAsyncRef', // todo: Ref?
			get pending() {},
			abort() {},
			toString,
		});
	};
	return oo(wfnnhlie, {
		name: 'computedAsync',
	});
};
