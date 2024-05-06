// @ts-nocheck

import {computed, signal} from '@angular/core';
import {AbstractControl} from '@angular/forms';

import oo, {toString} from '../../../misc/object-oven';

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

export type ReadonlyReactiveFormProxy<
	ControlT extends AbstractControl = AbstractControl,
> = (
	& {
		readonly control: ControlT;
	}
	& Readonly<Pick<ControlT, ReadonlyReactiveFormProp>>
);

// todo: rework
// todo: rename
export const formi: {
	<ControlT extends AbstractControl>(
		control: ControlT,
	): ReadonlyReactiveFormProxy<ControlT>;
} = (() => {
	let create = (control) => {
		// todo: use helper
		let changes$ = signal({});
		// todo: use helper
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
			if (method) {
				oo.extend(control, {
					[key]() {
						changes$.set({});
						return method.apply(this, arguments);
					},
				});
			}
		});
		return oo(
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
					changes$();
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
				toString,
			},
		);
	};
	let instances = new WeakMap();
	return (arg) => {
		let instance = instances.get(arg);
		if (instance == null) {
			instances.set(arg, instance = create(arg));
		}
		return instance;
	};
})();
