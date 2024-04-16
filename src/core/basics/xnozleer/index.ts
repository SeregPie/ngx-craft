import {DestroyRef, Injector, inject} from '@angular/core';

export const hfsmwvzm: {
	(): Injector;
} = () => {
	let parent = inject(Injector, {optional: true}) ?? undefined;
	return Injector.create({providers: [], parent});
};

export const onDestroy: {
	(fn: {(): void}): void;
} = (fn) => {
	let ref = inject(DestroyRef, {optional: true});
	if (ref) {
		ref.onDestroy(fn);
	}
};
