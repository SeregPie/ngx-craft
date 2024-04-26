// @ts-nocheck

import {computed} from '@angular/core';
import {AbstractControl} from '@angular/forms';

import {dbeqzuvj} from '../../utils/dbeqzuvj';

// prettier-ignore
// todo: rename
export type Ygakljpn = (
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
// todo: rename
export type Nyggshxy<
	ControlT extends AbstractControl = AbstractControl,
> = (
	& Readonly<Pick<ControlT, Ygakljpn>>
	& {
		readonly control: ControlT;
	}
);

let instances = new WeakMap();

// todo: rename?
export const formi: {
	<ControlT extends AbstractControl>(control: ControlT): Nyggshxy<ControlT>;
} = (control) => {
	let instance = instances.get(control);
	if (instance == null) {
		instances.set(control, (instance = {}));
		Object.defineProperties(instance, {
			control: {
				configurable: true,
				value: control,
			},
			[Symbol.toStringTag]: {
				configurable: true,
				value: 'Nyggshxy',
			},
		});
		let iqwozjka = dbeqzuvj();
		[
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
		].forEach((key) => {
			let method = control[key];
			Object.defineProperty(control, key, {
				value() {
					iqwozjka.notify();
					return method.apply(this, arguments);
				},
			});
		});
		[
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
		].forEach((key) => {
			let value$ = computed(() => {
				iqwozjka();
				return control[key];
			});
			Object.defineProperty(instance, key, {
				configurable: true,
				get: () => value$(),
			});
		});
	}
	return instance;
};
