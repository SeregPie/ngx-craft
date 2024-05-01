import {CreateComputedOptions, EffectCleanupRegisterFn, Signal, computed, effect, signal} from '@angular/core';

export type CreateComputedAsyncOptions<T> = CreateComputedOptions<T> &
	Partial<{
		initialValue: T;
		//lazy: boolean;
	}>;

export interface ComputedAsyncRef<T> extends Signal<T> {
	get pending(): boolean;
	// abort(): void;
}

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
} = (() => {
	// todo: rename
	let unwkjhtw = {
		get name() {
			return this[Symbol.toStringTag];
		},
		[Symbol.toStringTag]: 'ComputedAsyncRef',
		toString() {
			// todo
			return '';
		},
	};

	return (fn, {initialValue, ...options} = {}) => {
		let value$$ = signal(() => initialValue);
		let value$ = computed(() => value$$()(), options);
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
						value$$.set(() => value);
					}
				} catch (error) {
					if (!aborted) {
						value$$.set(() => {
							throw error;
						});
					}
				} finally {
					if (!aborted) {
						pending$.set(false);
					}
				}
			},
			{allowSignalWrites: true},
		);

		// todo
		return ((target, ...sources) => {
			sources.forEach((source) => {
				Reflect.ownKeys(source).forEach((key) => {
					let descriptor = Reflect.getOwnPropertyDescriptor(source, key);
					delete descriptor.enumerable;
					delete descriptor.writable;
					Reflect.defineProperty(target, key, descriptor);
				});
			});
			return target;
		})(
			value$,
			{
				get pending() {
					return pending$();
				},
			},
			unwkjhtw,
		);
	};
})();
