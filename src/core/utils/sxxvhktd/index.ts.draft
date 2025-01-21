import {computed, CreateComputedOptions, DestroyRef, inject, Injector, runInInjectionContext, Signal} from '@angular/core';

// todo: rename
export const sxxvhktd: {
	<T>(fn: {(): Signal<T>}, options?: CreateComputedOptions<T>): Signal<T>;
} = (fn, options) => {
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
		return runInInjectionContext(injector, fn);
	});
	return computed(() => rszyujzn()(), options);
};
