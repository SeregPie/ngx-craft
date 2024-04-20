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
export type Nyggshxy<
	ControlT extends AbstractControl = AbstractControl,
> = (
	& Readonly<Pick<ControlT, Ygakljpn>>
	& {
		readonly control: ControlT;
	}
);

// todo: rename?
export const formi = (() => {
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

	let instances = new WeakMap();

	function impl<ControlT extends AbstractControl>(
		control: ControlT,
	): Nyggshxy<ControlT> {
		let instance = instances.get(control);
		if (instance == null) {
			instances.set(control, (instance = null as any));
		}
		return instance;
	}

	return impl;
})();
