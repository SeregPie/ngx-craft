// @ts-nocheck

import {AbstractType, Signal, assertInInjectionContext, computed} from '@angular/core';
import {AbstractControl} from '@angular/forms';

import oo from '../../../misc/object-oven';

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
	let name = 'useFormFallthrough';
	let wfnnhlie = (controlCtor = AbstractControl) => {
		assertInInjectionContext(wfnnhlie);
	};
	return oo(wfnnhlie, {
		...((zquwmtih) => {
			let name = 'required';
			let wfnnhlie = (...args) => {
				assertInInjectionContext(wfnnhlie);
				let result$ = zquwmtih(...args);
				return computed(() => {
					let result = result$();
					if (result == null) {
						throw new Error(`required but not available`);
					}
					return result;
				});
			};
			return {
				// todo: rename arg
				[name]: oo(wfnnhlie, {
					get name() {
						return `${zquwmtih.name}.${name}`;
					},
					toString,
				}),
			};
		})(wfnnhlie),
		name,
		toString,
	});
})();
