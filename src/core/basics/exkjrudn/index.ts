import {ElementRef, Signal, computed} from '@angular/core';

import {MaybeSignal, resolveSignal} from '../fgiuurtv';

export type MaybeElementSignal<T> = MaybeSignal<T | ElementRef<T>>;

export const resolveElementSignal: {
	<T>(v: MaybeElementSignal<T>): Signal<T>;
} = (v) => {
	let v$ = resolveSignal(v);
	return computed(() => {
		let v = v$();
		if (v instanceof ElementRef) {
			return v.nativeElement;
		}
		return v;
	});
};
