// @ts-nocheck

import {AbstractType, Signal, afterRender, computed, inject, signal} from '@angular/core';
import {AbstractControl, ControlContainer, NgControl} from '@angular/forms';

export const useFormFallthrough: {
	<TControl extends AbstractControl>(
		controlCtor?: AbstractType<TControl>,
	): Signal<undefined | TControl>;
	required: {
		<TControl extends AbstractControl>(
			...args: Parameters<typeof useFormFallthrough<TControl>>
		): Signal<TControl>;
	};
} = (() => {
	return Object.assign((controlCtor = AbstractControl) => {
		let fromDirective = (ref) => {
			let watch = signal({});
			afterRender(() => {
				setTimeout(() => {
					watch.set({});
				});
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
				return fromDirective(ref);
			}
		}
		{
			let ref = inject(ControlContainer, {self: true, optional: true});
			if (ref != null) {
				return fromDirective(ref);
			}
		}
		return signal(undefined).asReadonly();
	}, {
		required: (...args) => {
			let result$ = useFormFallthrough(...args);
			return computed(() => {
				let result = result$();
				if (result == null) {
					throw new Error(`required but not available`);
				}
				return result;
			});
		},
	});
})();
