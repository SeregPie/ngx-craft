// @ts-nocheck

import {computed, signal} from '@angular/core';
import {AbstractControl} from '@angular/forms';

import oo, {toString} from '../../../misc/object-oven';

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

// todo?
const createReadonlyReactiveFormProxy = (() => {
	let create = (control) => {
		let changes$ = signal({});
		[
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
			instances.set(arg, (instance = create(arg)));
		}
		return instance;
	};
})();

export const formi: {
	<ControlT extends AbstractControl>(
		//
		control: ControlT,
	): ReadonlyReactiveFormProxy<ControlT>;
} = createReadonlyReactiveFormProxy;
