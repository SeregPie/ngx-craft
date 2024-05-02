// @ts-nocheck

import {computed} from '@angular/core';
import {AbstractControl} from '@angular/forms';

import o from '../../../misc/kkgcobgp';
import {dbeqzuvj} from '../../utils/dbeqzuvj';

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

// prettier-ignore
export type ReadonlyReactiveFormProxy<
	ControlT extends AbstractControl = AbstractControl,
> = (
	& {
		readonly control: ControlT;
	}
	& Readonly<Pick<ControlT, ReadonlyReactiveFormProp>>
);

export const formi: {
	<ControlT extends AbstractControl>(
		//
		control: ControlT,
	): ReadonlyReactiveFormProxy<ControlT>;
} = (() => {
	// todo: rename
	let unwkjhtw = {
		[Symbol.toStringTag]: 'ReadonlyReactiveFormProxy',
		toString() {
			// todo
			return '';
		},
	};

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

	let create = (control) => {
		// todo: rename
		let iqwozjka = dbeqzuvj();
		watchedMethods.forEach((key) => {
			let method = control[key];
			o(control, {
				[key]() {
					iqwozjka.notify();
					return method.apply(this, arguments);
				},
			});
		});
		// todo: rename
		let hpaphuld = exposedGetters.map((key) => {
			let value$ = computed(() => {
				iqwozjka();
				return control[key];
			});
			return {
				get [key]() {
					return value$();
				},
			};
		});
		return o.new({control}, ...hpaphuld, unwkjhtw);
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
