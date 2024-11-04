let {WeakMap} = globalThis;

import {AbstractControl} from '@angular/forms';

import oo from '../../../misc/object-oven';
import {ubwbmpmj} from '../../utils/ubwbmpmj';

// todo: rename
export const formi: {
	<const ControlT extends AbstractControl>(
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
		let {notify, tracked} = ubwbmpmj();
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
				let value$ = tracked(() => control[key]);
				return {
					get [key]() {
						return value$();
					},
				};
			}),
		);
	};
	let instances = new WeakMap();
	return (target) => {
		let instance = instances.get(target);
		if (instance == null) {
			instances.set(target, (instance = create(target)));
		}
		return instance;
	};
})();

// prettier-ignore
// todo: rename
// todo: readonly?
export type ReadonlyReactiveFormProxy<
	ControlT extends AbstractControl = AbstractControl,
> = (
	& {
		readonly control: ControlT;
	}
	& Readonly<Pick<ControlT, ReadonlyReactiveFormProp>>
);

// prettier-ignore
// todo: rename
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
