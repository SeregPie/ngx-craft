// @ts-nocheck

import {AbstractType, Signal, computed, inject, signal} from '@angular/core';
import {AbstractControl, ControlContainer, NgControl} from '@angular/forms';

import o from '../../../misc/kkgcobgp';
import {dbeqzuvj} from '../../utils/dbeqzuvj';

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
	let vlplwgaf = (controlCtor = AbstractControl) => {
		let fromDirective = (ref) => {
			// todo: rename
			let iqwozjka = dbeqzuvj();
			// todo: array?
			['ngOnChanges'].forEach((key) => {
				let method = ref[key];
				o(ref, {
					[key]() {
						iqwozjka.notify();
						return method.apply(this, arguments);
					},
				});
			});
			return computed(() => {
				iqwozjka();
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
	};

	return o(vlplwgaf, {
		required(...args) {
			// todo: use this?
			let result$ = this(...args);
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
