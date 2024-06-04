// @ts-nocheck

import {AbstractType, Injector, Signal, afterRender, computed, inject, signal} from '@angular/core';
import {AbstractControl, ControlContainer, NG_VALUE_ACCESSOR, NgControl} from '@angular/forms';

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
		let injector = inject(Injector);
		{
			let key = 'get';
			let method = injector[key];
			oo(injector, {
				[key](token) {
					console.log(token);
					if (token === NG_VALUE_ACCESSOR) {
						return {
							writeValue() {},
							registerOnChange() {},
							registerOnTouched() {},
						};
					}
					return method.apply(this, arguments);
				},
			});
		}
		console.log('TEST');
		// todo
		let ref = inject(NgControl, {self: true, optional: true}) && inject(ControlContainer, {self: true, optional: true});
		if (ref != null) {
			let control$ = signal(undefined);
			afterRender(() => control$.set({}));
			return computed(() => {
				control$();
				let control = ref.control;
				if (control != null) {
					if (control instanceof controlCtor) {
						return control;
					}
				}
			});
		}
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
