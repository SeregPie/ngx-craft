import {AbstractType, Signal, computed, inject, signal} from '@angular/core';
import {AbstractControl, ControlContainer, NgControl} from '@angular/forms';

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
			// todo: use helper
			let obgrjmtj = signal({});
			let ubwbmpmj = () => obgrjmtj.set({});
			let kzvkwvvv = (fn) => computed(() => obgrjmtj() && fn());
			// todo: use helper
			['ngOnChanges'].forEach((key) => {
				let method = ref[key];
				if (method) {
					oo(ref, {
						[key]() {
							ubwbmpmj();
							return method.apply(this, arguments);
						},
					});
				}
			});
			// todo: use helper
			['name'].forEach((key) => {
				let value = ref[key];
				oo(ref, {
					get [key]() {
						return value;
					},
					set [key](v) {
						ubwbmpmj();
						value = v;
					},
				});
			});
			return kzvkwvvv(() => {
				let {control} = ref;
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
