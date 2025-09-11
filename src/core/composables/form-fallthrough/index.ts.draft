import {AbstractType, Signal, computed, inject, signal} from '@angular/core';
import {AbstractControl, ControlContainer, NG_VALUE_ACCESSOR, NgControl} from '@angular/forms';

import oo from '../../../misc/object-oven';
import {qeozagnw} from '../../basics/jshrsvyw';
import {provide} from '../../basics/provider-compitibility';
import {dhhjnwiz} from '../../utils/dhhjnwiz';
import {ubwbmpmj} from '../../utils/ubwbmpmj';

export const useFormFallthrough: {
	<ControlT extends AbstractControl>(
		// todo: rename?
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
		if (inject(NG_VALUE_ACCESSOR, {optional: true, self: true}) == null) {
			qeozagnw([
				provide(NG_VALUE_ACCESSOR, {multi: true}).useValue({
					writeValue() {},
					registerOnChange() {},
					registerOnTouched() {},
				}),
			]);
		}
		let ref = inject(NgControl, {self: true, optional: true}) ?? inject(ControlContainer, {self: true, optional: true});
		if (ref != null) {
			// todo
			let {notify, tracked} = ubwbmpmj();
			dhhjnwiz(ref, notify);
			return tracked(() => {
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
	// todo: rename
	let flbcqpwq = 'useFormFallthrough';
	return oo(wfnnhlie, {
		required: (...args) => {
			let result$ = wfnnhlie(...args);
			return computed(() => {
				let result = result$();
				if (result == null) {
					throw new Error(); // todo: message
				}
				return result;
			});
		},
		name: flbcqpwq,
	});
})();
