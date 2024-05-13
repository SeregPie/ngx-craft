// @ts-nocheck

import {AbstractType, Signal, computed} from '@angular/core';
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
	let call = (controlCtor = AbstractControl) => {};
	return oo(call, {
		...((zquwmtih) => {
			let key = 'required';
			let call = (...args) => {
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
				[key]: oo(call, {
					get name() {
						return `${zquwmtih.name}.${key}`;
					},
				}),
			};
		})(call),
		name: 'useFormFallthrough',
	});
})();
