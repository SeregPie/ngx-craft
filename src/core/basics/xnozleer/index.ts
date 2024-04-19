import {DestroyRef, Injector, inject} from '@angular/core';

// todo: rename
export function hfsmwvzm(): Injector {
	let injector = inject(Injector, {optional: true});
	return Injector.create({providers: [], parent: injector ?? undefined});
};

export function onDestroy(fn: {(): void}): void {
	let ref = inject(DestroyRef, {optional: true});
	if (ref) {
		ref.onDestroy(fn);
	}
};
