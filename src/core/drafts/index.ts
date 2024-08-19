import {CreateComputedOptions, DestroyRef, EffectCleanupFn, EffectCleanupRegisterFn, inject, INJECTOR, Injector, Provider, Signal} from '@angular/core';

export const dfgdxkxi: {
	<T>(
		//
		fn: {(onCleanup: EffectCleanupFn): Signal<T>},
		options?: CreateComputedOptions<T>,
	): Signal<T>;
} = (fn, options) => {
	// todo
	throw '';
};

export const toAbortSignal: {
	(fn: EffectCleanupRegisterFn): AbortSignal;
} = (fn) => {
	let controller = new AbortController();
	fn(() => controller.abort());
	return controller.signal;
};

export const withAbortSignal: {
	<T>(fn: {(signal: AbortSignal): T}): {(onCleanup: EffectCleanupRegisterFn): T};
} = (fn) => (onCleanup) => fn(toAbortSignal(onCleanup));

/*
export const withPreviousValue: {
	<T>(fn: {(value: undefined | T): T}): {(): T};
	<T>(fn: {(value: T): T}, value: T): {(): T};
} = (fn, value) => () => (value = fn(value));
*/

export const getCurrentInjector: {
	(): undefined | Injector;
} = () => {
	try {
		let injector = inject(INJECTOR);
		if (injector instanceof Injector) {
			return injector;
		}
	} catch {}
};

export const isInInjectionContext: {
	(): boolean;
} = () => getCurrentInjector() != null;

// todo: rename
export interface CgbxxahrInjector extends Injector {
	get destroyed(): boolean;
	destroy(): void;
}

export type CreateInjectorOptions = Partial<{
	providers: ReadonlyArray<Provider>;
	loose: boolean;
}>;

/*
let pyvoikwr = Injector.create({
	providers: [ɵEffectScheduler],
});

export const createInjector: {
	(options?: CreateInjectorOptions): CgbxxahrInjector;
} = ({
	//
	providers = [],
	loose = false,
} = {}) => {
	let parent = (() => {
		if (!loose) {
			let injector = getCurrentInjector();
			if (injector) {
				return injector;
			}
			return pyvoikwr;
		}
	})();
	return Injector.create({providers, parent});
};
*/

export const onDestroy: {
	(fn: {(): void}): {(): void};
} = (fn) => inject(DestroyRef).onDestroy(fn);

export class A {
	constructor() {
		effect(() => {
			console.log(this.ltrenpcc());
		});
		setTimeout(() => {
			this.wekdzqmp.set('(max-width: 1000px)');
		}, 3000);
	}

	wekdzqmp = signal<string>('(max-width: 800px)');

	ltrenpcc = (() => {
		let szuwvxit = inject(Injector);
		let injector: null | Injector = null;
		let rszyujzn = computed(() => {
			if (injector) {
				(<any>injector).destroy();
			}
			injector = Injector.create({providers: [], parent: szuwvxit});
			szuwvxit.get(DestroyRef).onDestroy(() => {
				(<any>injector).destroy();
			});
			return runInInjectionContext(injector, () => {
				let query = this.wekdzqmp();
				let kekdcyrv = window.matchMedia(query);
				let ywuqsgjv = signal({});
				((target, event, listener) => {
					target.addEventListener(event, listener);
					inject(DestroyRef).onDestroy(() => {
						console.log('remove event listener');
						target.removeEventListener(event, listener);
					});
				})(kekdcyrv, 'change', () => ywuqsgjv.set({}));
				return computed(() => {
					ywuqsgjv();
					return kekdcyrv.matches;
				});
			});
		});
		return computed(() => rszyujzn()());
	})();
}
