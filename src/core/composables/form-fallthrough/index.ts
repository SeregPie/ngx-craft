// @ts-nocheck

import {AbstractType, Signal, computed, inject, signal} from '@angular/core';
import {AbstractControl, ControlContainer, NgControl} from '@angular/forms';

import oo from '../../../misc/object-oven';
import {tracked} from '../../utils/tracked';

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
		// todo
		let fromDirective = (ref) => {
			let {track, notify} = tracked();
			// todo: array?
			['ngOnChanges'].forEach((key) => {
				let method = ref[key];
				oo.extend(ref, {
					[key]() {
						notify();
						return method.apply(this, arguments);
					},
				});
			});
			return computed(() => {
				track();
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

	return oo.extend(vlplwgaf, {
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
