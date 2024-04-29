// @ts-nocheck

import {computed} from '@angular/core';

import o from '../../../misc/kkgcobgp';
import {dbeqzuvj} from '../../utils/dbeqzuvj';

// todo
let create = (control) => {
	// prettier-ignore
	let controlProxy = o({}, {
		control,
		[Symbol.toStringTag]: 'ReadonlyReactiveFormProxy',
		toString() {
			// todo
			return '';
		}
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
		o(control, {
			[key]() {
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
		o(controlProxy, {
			get [key]() {
				return value$();
			},
		});
	});
	// prettier-ignore
	return controlProxy;
};

// todo: rename
let adkzzfxw = (v) => v;
let instances = new WeakMap();

export default ((...args) => {
	let key = adkzzfxw(...args);
	let instance = instances.get(key);
	if (instance == null) {
		instances.set(key, (instance = create(...args)));
	}
	return instance;
}) as any;
