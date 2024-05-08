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
	// todo: rename
	let o = (controlCtor = AbstractControl) => {
		assertInInjectionContext(o);
	};
	return oo(o, {
		...((key) => ({
			// todo: rename arg
			[key]: ((os) => {
				// todo: rename
				let o = (...args) => {
					assertInInjectionContext(o);
					let result$ = os(...args);
					return computed(() => {
						let result = result$();
						if (result == null) {
							throw new Error(`required but not available`);
						}
						return result;
					});
				};
				return oo(o, {
					get name() {
						return `${os.name}.${key}`;
					},
					toString,
				});
			})(o),
		}))('required'),
		name: 'useFormFallthrough',
		toString,
	});
})();
