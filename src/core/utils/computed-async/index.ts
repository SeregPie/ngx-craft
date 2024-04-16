import {
	CreateComputedOptions,
	EffectCleanupRegisterFn,
	Injector,
	Signal,
	computed,
	effect,
	inject,
	signal,
} from '@angular/core';

function hfsmwvzm(): Injector {
	return inject(Injector, {optional: true}) ?? Injector.create({providers: []});
}

// prettier-ignore
export type CreateComputedAsyncOptions<T> = (
	& CreateComputedOptions<T>
	& Partial<{
		initialValue: T;
	}>
)
// prettier-ignore
export interface ComputedAsyncRef<T>
	extends Signal<Promise<T>>
{
	get pending(): boolean;
}

export function computedAsync<T>(
	fn: {(onCleanup: EffectCleanupRegisterFn): Promise<T>},
	options: CreateComputedAsyncOptions<T> & {initialValue: T},
): ComputedAsyncRef<T>;

export function computedAsync<T>(
	fn: {(onCleanup: EffectCleanupRegisterFn): Promise<T>},
	options?: CreateComputedAsyncOptions<undefined | T>,
): ComputedAsyncRef<undefined | T>;

export function computedAsync<T>(
	fn: {(onCleanup: EffectCleanupRegisterFn): Promise<T>},
	{initialValue, ...options}: CreateComputedAsyncOptions<undefined | T> = {},
): ComputedAsyncRef<undefined | T> {
	let injector = hfsmwvzm();
	// todo: rename
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
	// todo
	return Object.defineProperties(
		computed(() => rwfgnjaq$()(), options),
		{
			pending: {
				configurable: true,
				get: () => pending$(),
			},
		},
	);
}