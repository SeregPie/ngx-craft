import {AbstractControl} from '@angular/forms';

import oo from '../../../misc/object-oven';
import {ubwbmpmj} from '../../drafts';

// todo: rename?
export const formi: {
	<ControlT extends AbstractControl>(
		//
		control: ControlT,
	): ReadonlyReactiveFormProxy<ControlT>;
} = (() => {
	let watchedMethods = [
		//
		'_updatePristine',
		'_updateTouched',
		'_updateValue',
		'disable',
		'enable',
		'markAsDirty',
		'markAsPending',
		'markAsPristine',
		'markAsTouched',
		'markAsUntouched',
		'setErrors',
		'updateValueAndValidity',
	];
	let exposedGetters = [
		//
		'status',
		'valid',
		'invalid',
		'pending',
		'disabled',
		'enabled',
		'pristine',
		'dirty',
		'touched',
		'untouched',
		'value',
		'errors',
	];
	let create = (control) => {
		let {computed, notify} = ubwbmpmj();
		watchedMethods.forEach((key) => {
			let method = control[key];
			if (method) {
				oo(control, {
					[key]() {
						notify();
						return method.apply(this, arguments);
					},
				});
			}
		});
		return oo.new(
			{
				control,
			},
			...exposedGetters.map((key) => {
				let value$ = computed(() => control[key]);
				return {
					get [key]() {
						return value$();
					},
				};
			}),
		);
	};
	let instances = new WeakMap();
	return (arg) => {
		let instance = instances.get(arg);
		if (instance == null) {
			instances.set(arg, (instance = create(arg)));
		}
		return instance;
	};
})();

// prettier-ignore
export type ReadonlyReactiveFormProxy<
	ControlT extends AbstractControl = AbstractControl,
> = (
	& {
		readonly control: ControlT;
	}
	& Readonly<Pick<ControlT, ReadonlyReactiveFormProp>>
);

// prettier-ignore
export type ReadonlyReactiveFormProp = (
	| 'status'
	| 'valid'
	| 'invalid'
	| 'pending'
	| 'disabled'
	| 'enabled'
	| 'pristine'
	| 'dirty'
	| 'touched'
	| 'untouched'
	| 'value'
	| 'errors'
);
