// @ts-nocheck

import {AbstractControl, ValidationErrors, ValidatorFn} from '@angular/forms';

/**
 * Interface for custom validator functions that operate on a specific type of AbstractControl.
 * @template ControlT - The type of AbstractControl the validator operates on.
 */
export interface CustomValidatorFn<
	//
	ControlT extends AbstractControl = AbstractControl,
> {
	/**
	 * Function signature for a custom validator.
	 * @param control - The control to validate.
	 * @returns Validation errors if any, or null if the control is valid.
	 */
	(control: ControlT): ReturnType<ValidatorFn>;
}



/**
 * A no-operation validator that always returns null.
 */
export const noopValidator: {
	(control: AbstractControl): null;
} = () => null;

/**
 * A stub validator that always returns a predefined set of validation errors.
 * @template ErrorsT - The type of validation errors returned.
 * @param errors - The validation errors to return.
 * @returns A validator function that returns the provided errors.
 */
export const stubValidator: {
	<const ErrorsT extends ValidationErrors>(
		errors: ErrorsT,
	): {
		(control: AbstractControl): ErrorsT;
	};
} = (errors) => () => errors;

/**
 * Adds the provided validators to a control and updates its validity state.
 * @template ControlT - The type of AbstractControl to enhance.
 * @param control - The control to which validators are added.
 * @param validators - The array of validators to apply.
 * @returns The control with the validators applied.
 */
export function withValidators<
	//
	const ControlT extends AbstractControl,
>(
	//
	control: ControlT,
	...validators: CustomValidatorFn<ControlT>[]
): ControlT;

export function withValidators(control, ...validators) {
	control.addValidators(validators);
	control.updateValueAndValidity();
	return control;
}

/**
 * Composes multiple validators into a single validator.
 * @template ControlT - The type of AbstractControl the validators operate on.
 * @param validators - An array of validators to compose.
 * @returns A single validator that applies all the provided validators in sequence.
 */
export function composeValidators<
	//
	const ControlT extends AbstractControl,
>(
	//
	validators: ReadonlyArray<CustomValidatorFn<ControlT>>,
): CustomValidatorFn<ControlT>;

export function composeValidators(validators) {
	switch (validators.length) {
		case 0:
			return noopValidator;
		case 1:
			return validators[0];
	}
	return (control) => {
		for (let validator of validators) {
			let errors = validator(control);
			if (errors != null) {
				return errors;
			}
		}
		return null;
	};
}

export * from './async';
