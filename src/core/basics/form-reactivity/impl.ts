// @ts-nocheck

import {computed, signal} from '@angular/core';

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

export default (control) => {
	let instance = instances.get(control);
	if (instance == null) {
		let descriptors = {};
		Object.entries({
			control,
		}).forEach(([key, value]) => {
			descriptors[key] = {value};
		});
		let watch = signal({});
		watchedMethods.forEach((key) => {
			let method = control[key];
			Object.assign(control, {
				[key]() {
					watch.set({});
					return method.apply(this, arguments);
				},
			});
		});
		exposedGetters.forEach((key) => {
			let value$ = computed(() => {
				watch();
				return control[key];
			});
			descriptors[key] = {
				get() {
					return value$();
				},
			};
		});
		// prettier-ignore
		instances.set(control, instance = Object.create(prototype, descriptors));
	}
	return instance;
};
