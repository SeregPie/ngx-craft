import {CreateComputedOptions, EffectCleanupRegisterFn, Signal} from '@angular/core';

export type CreateComputedAsyncOptions<T> = (
	& CreateComputedOptions<T>
	& Partial<{
		initialValue: T;
		lazy: boolean;
	}>
);

export interface ComputedAsyncRef<T>
	extends Signal<Promise<T>>
{
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
} = null as any;
