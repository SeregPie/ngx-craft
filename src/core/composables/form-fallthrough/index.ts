// @ts-nocheck

import {Signal, Type, afterRender, computed, inject, signal} from '@angular/core';
import {AbstractControl, ControlContainer, NgControl} from '@angular/forms';

export const useFormFallthrough: {
	<TControl extends AbstractControl>(
		controlCtor?: Type<TControl>,
	): Signal<undefined | TControl>;
	required: {
		<TControl extends AbstractControl>(
			...args: Parameters<typeof useFormFallthrough<TControl>>
		): Signal<TControl>;
	};
} = (() => {
	return Object.assign((controlCtor = AbstractControl) => {
		// todo: rename
		let vozrwodm = (ref) => {
			let watch = signal({});
			afterRender(() => {
				watch.set({});
			});
			return computed(() => {
				watch();
				if (ref.control != null) {
					if (ref.control instanceof controlCtor) {
						return ref.control;
					}
				}
			});
		};
		{
			let ref = inject(NgControl, {self: true, optional: true});
			if (ref != null) {
				ref.valueAccessor ??= {
					writeValue() {},
					registerOnChange() {},
					registerOnTouched() {},
				};
				return vozrwodm(ref);
			}
		}
		{
			let ref = inject(ControlContainer, {self: true, optional: true});
			if (ref != null) {
				return vozrwodm(ref);
			}
		}
		return signal(undefined).asReadonly();
	}, {
		required: (...args) => {
			let result$ = useFormFallthrough(...args);
			return computed(() => {
				let result = result$();
				if (result == null) {
					// todo: message
					throw new Error(`required but not available`);
				}
				return result;
			});
		},
	});
})();
