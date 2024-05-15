// @ts-nocheck

import {AbstractType, Signal, computed} from '@angular/core';
import {AbstractControl} from '@angular/forms';

import oo from '../../../misc/object-oven';

// todo: should work without injection context

export const useFormFallthrough: {
	<ControlT extends AbstractControl>(
		//
		controlCtor?: AbstractType<ControlT>,
	): Signal<undefined | ControlT>;
	required: {
		<ControlT extends AbstractControl>(
			//
			...args: Parameters<typeof useFormFallthrough<ControlT>>
		): Signal<ControlT>;
	};
} = (() => {
	// todo: rename
	let wfnnhlie = (controlCtor = AbstractControl) => {
		return signal(undefined).asReadonly();
	};
	return oo(wfnnhlie, {
		required: (...args) => {
			let result$ = wfnnhlie(...args);
			return computed(() => {
				let result = result$();
				if (result == null) {
					// todo
					throw new Error(`required but not available`);
				}
				return result;
			});
		},
	});
})();
