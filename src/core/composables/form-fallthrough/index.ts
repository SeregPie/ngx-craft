// @ts-nocheck

import {Signal, computed} from '@angular/core';
import {AbstractControl} from '@angular/forms';

export function useFormFallthrough<
	//
	ControlT extends AbstractControl,
>(): Signal<undefined | ControlT>;

export function useFormFallthrough() {
	// todo
	throw 'not implemented yet';
}

export namespace useFormFallthrough {
	export function required<
		//
		ControlT extends AbstractControl,
	>(
		//
		...args: Parameters<typeof useFormFallthrough<ControlT>>
	): Signal<ControlT>;

	export function required(...args) {
		let result$ = useFormFallthrough(...args);
		return computed(() => {
			let result = result$();
			if (result != null) {
				return result;
			}
			throw new Error(); // todo: message
		});
	}
}
