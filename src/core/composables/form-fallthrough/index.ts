// @ts-nocheck

import {AbstractType, Signal, computed, inject, signal} from '@angular/core';
import {AbstractControl, ControlContainer, NgControl} from '@angular/forms';

import oo from '../../../misc/object-oven';

export const useFormFallthrough: {
	<ControlT extends AbstractControl>(
		controlCtor?: AbstractType<ControlT>,
	): Signal<undefined | ControlT>;
	required: {
		<ControlT extends AbstractControl>(
			...args: Parameters<typeof useFormFallthrough<ControlT>>
		): Signal<ControlT>;
	};
} = oo.extend(
	(controlCtor = AbstractControl) => {
		let ref = inject(NgControl, {self: true, optional: true});
		if (ref != null) {
			ref.valueAccessor ??= {
				writeValue() {},
				registerOnChange() {},
				registerOnTouched() {},
			};
		} else {
			ref = inject(ControlContainer, {self: true, optional: true});
		}
		if (ref != null) {
			let changes$ = signal({});
			['ngOnChanges'].forEach((key) => {
				let method = ref[key];
				if (method) {
					oo.extend(ref, {
						[key]() {
							changes$.set({});
							return method.apply(this, arguments);
						},
					});
				}
			});
			['name'].forEach((key) => {
				let value = ref[key];
				oo.extend(ref, {
					get [key]() {
						return value;
					},
					set [key](v) {
						changes$.set({});
						value = v;
					},
				});
			});
			return computed(() => {
				changes$();
				let {control} = ref;
				if (control != null) {
					if (control instanceof controlCtor) {
						return control;
					}
				}
			});
		}
		return signal(undefined).asReadonly();
	},
	{
		required(...args) {
			let result$ = this(...args);
			return computed(() => {
				let result = result$();
				if (result == null) {
					throw new Error(`required but not available`);
				}
				return result;
			});
		},
	},
);
