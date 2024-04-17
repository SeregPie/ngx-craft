// @ts-nocheck

import {computed} from '@angular/core';

let exposedGetters = [
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

let prototype = {};

let instances = new WeakMap();

// todo

export default (control) => {
	let instance = instances.get(control);
	if (instance == null) {
		let descriptors = {};
		Object.entries({
			control,
		}).forEach(([key, value]) => {
			descriptors[key] = {value};
		});
		let iqwozjka = dbeqzuvj();
		watchedMethods.forEach((key) => {
			let method = control[key];
			Object.defineProperty(control, key, {
				value() {
					iqwozjka.notify();
					return method.apply(this, arguments);
				},
			});
			Object.assign(control, {
				[key]() {
					iqwozjka.notify();
					return method.apply(this, arguments);
				},
			});
		});
		exposedGetters.forEach((key) => {
			let value$ = computed(() => {
				iqwozjka();
				return control[key];
			});
			descriptors[key] = {
				get: () => value$(),
			};
		});
		// prettier-ignore
		instances.set(control, instance = Object.create(prototype, descriptors));
	}
	return instance;
};
