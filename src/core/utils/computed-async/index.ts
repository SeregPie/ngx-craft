import {
	CreateComputedOptions,
	EffectCleanupRegisterFn,
	Signal,
	computed,
	effect,
} from '@angular/core';

export type CreateComputedAsyncOptions<T> = CreateComputedOptions<T> &
	Partial<{
		initialValue: T;
	}>;

export interface ComputedAsyncRef<T> extends Signal<Promise<T>> {
	get pending(): boolean;
	abort(): void;
}

export const computedAsync: {
	<T>(
		fn: {(onCleanup: EffectCleanupRegisterFn): Promise<T>},
		options: CreateComputedAsyncOptions<T> & {initialValue: T},
	): ComputedAsyncRef<T>;
	<T>(
		fn: {(onCleanup: EffectCleanupRegisterFn): Promise<T>},
		options?: CreateComputedAsyncOptions<T>,
	): ComputedAsyncRef<undefined | T>;
} = (fn, {initialValue} = {}) => {
	computed;
	effect;
	fn;
	initialValue;
	throw null;
};
