import {DestroyRef, Injector, inject} from '@angular/core';

// todo: rename
export const hfsmwvzm: {
	(): Injector;
} = () => {
	let injector = inject(Injector, {optional: true});
	return Injector.create({providers: [], parent: injector ?? undefined});
};

export const onDestroy: {
	(fn: {(): void}): void;
} = (fn) => {
	let ref = inject(DestroyRef, {optional: true});
	if (ref) {
		ref.onDestroy(fn);
	}
};
