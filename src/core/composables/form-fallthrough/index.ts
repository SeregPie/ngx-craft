// @ts-nocheck

import {
	AbstractType,
	Signal,
	afterRender,
	computed,
	inject,
	signal,
} from '@angular/core';
import {AbstractControl, ControlContainer, NgControl} from '@angular/forms';

export const useFormFallthrough: {
	<ControlT extends AbstractControl>(
		// todo: rename
		controlCtor?: AbstractType<ControlT>,
	): Signal<undefined | ControlT>;
	required: {
		<ControlT extends AbstractControl>(
			...args: Parameters<typeof useFormFallthrough<ControlT>>
		): Signal<ControlT>;
	};
} = Object.defineProperties(
	(controlCtor = AbstractControl) => {
		let hubitguq = signal(undefined);
		let fromDirective = (ref) => {
			let xhskcqcu = () => {
				if (ref.control != null) {
					if (ref.control instanceof controlCtor) {
						return ref.control;
					}
				}
			};
			afterRender(() => {
				hubitguq.set(xhskcqcu());
			});
			hubitguq.set(xhskcqcu());
			return hubitguq.asReadonly();
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
		return hubitguq.asReadonly();
	},
	{
		required: {
			configurable: true,
			value: (...args) => {
				let result$ = useFormFallthrough(...args);
				return computed(() => {
					let result = result$();
					if (result == null) {
						throw new Error(`required but not available`);
					}
					return result;
				});
			},
		},
	},
);
