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
		lazy: boolean;
	}>
)
// prettier-ignore
export interface ComputedAsyncRef<T>
	extends Signal<Promise<T>>
{
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
		options?: CreateComputedAsyncOptions<undefined | T>,
	): ComputedAsyncRef<undefined | T>;
} = (fn, {initialValue, lazy = false, ...options} = {}) => {
	let injector = hfsmwvzm();
	// todo: rename
	let active$ = signal(!lazy);
	// todo: rename
	let rwfgnjaq$ = signal(() => {
		setTimeout(() => {
			active$.set(true);
		});
		return initialValue;
	});
	let pending$ = signal(false);
	let qsmtxdkl = () => {};
	effect(
		async (onCleanup) => {
			if (active$()) {
				let controller = new AbortController();
				onCleanup(
					(qsmtxdkl = () => {
						controller.abort();
					}),
				);
				let {signal} = controller;
				onCleanup = (fn) => {
					signal.addEventListener('abort', () => fn());
				};
				try {
					let value = await fn(onCleanup);
					if (!signal.aborted) {
						rwfgnjaq$.set(() => value);
					}
				} catch (error) {
					if (!signal.aborted) {
						rwfgnjaq$.set(() => {
							throw error;
						});
					}
				} finally {
					if (!signal.aborted) {
						pending$.set(false);
					}
				}
			}
		},
		{
			allowSignalWrites: true,
			injector,
		},
	);
	let abort = () => {
		effectRef.destroy();
		qsmtxdkl();
		pending$.set(false);
	};
	// todo
	return Object.defineProperties(
		computed(() => rwfgnjaq$()(), options),
		{
			pending: {
				configurable: true,
				get: () => pending$(),
			},
			abort: {
				configurable: true,
				value: abort,
			},
		},
	);
};
