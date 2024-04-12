// @ts-nocheck

import {computed, signal} from '@angular/core';
import {AbstractControl} from '@angular/forms';

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
export type Nyggshxy<TControl extends AbstractControl = AbstractControl> = (
	& Readonly<Pick<TControl, Ygakljpn>>
	& {
		readonly control: TControl;
	}
);

// todo: rename?
export const formi: {
	<TControl extends AbstractControl>(
		//
		control: TControl,
	): Nyggshxy<TControl>;
} = (() => {
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
	return (control) => {
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
})();
