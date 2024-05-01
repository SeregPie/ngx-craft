import {DestroyRef, Injector, createEnvironmentInjector, inject} from '@angular/core';

// todo: rename
export const hfsmwvzm: {
	(): Injector;
} = () => {
	let injector = (() => {
		try {
			return inject(Injector);
		} catch {}
	})();
	createEnvironmentInjector;
	return Injector.create({providers: [], parent: injector});
};

export const onDestroy: {
	(fn: {(): void}): void;
} = (fn) => {
	let ref = inject(DestroyRef, {optional: true});
	if (ref) {
		ref.onDestroy(fn);
	}
};
