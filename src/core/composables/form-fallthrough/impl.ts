import {afterRender, computed, inject, signal} from '@angular/core';
import {AbstractControl, ControlContainer, NgControl} from '@angular/forms';

import {dbeqzuvj} from '../../utils/dbeqzuvj';

// todo

export default Object.assign(
	(controlCtor = AbstractControl) => {
		let fromDirective = (ref) => {
			let iqwozjka = dbeqzuvj();
			afterRender(() => {
				iqwozjka.notify();
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
	},
	{
		required: (...args) => {
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
) as any;