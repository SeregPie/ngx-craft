// @ts-nocheck

import {computed} from '@angular/core';

import {o} from '../../../misc/kkgcobgp';
import {dbeqzuvj} from '../../utils/dbeqzuvj';

let create = (control) => {
	let iqwozjka = dbeqzuvj();
	o(
		control,
		...[
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
		].map((key) => {
			let method = control[key];
			return {
				[key]() {
					iqwozjka.notify();
					return method.apply(this, arguments);
				},
			};
		}),
	);
	// prettier-ignore
	return o({}, ...[
		{
			control,
		},
		...[
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
		].map((key) => {
			let value$ = computed(() => {
				iqwozjka();
				return control[key];
			});
			return {
				get [key]() {
					return value$();
				},
			};
		}),
		{
			[Symbol.toStringTag]: 'ReadonlyReactiveFormProxy',
		},
	]);
};

// todo: rename
let adkzzfxw = (v) => v;
let instances = new WeakMap();

// prettier-ignore
export default o((...args) => {
	let key = adkzzfxw(...args)
	let instance = instances.get(key);
	if (instance == null) {
		instances.set(key, instance = create(...args));
	}
	return instance;
}, {
	name: 'formi',
}) as any;
