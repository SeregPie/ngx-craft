
import {AbstractControl, ValidationErrors, ValidatorFn} from '@angular/forms';

export type CustomValidatorFn<
	//
	ControlT extends AbstractControl = AbstractControl,
> = {
	/**
	 * Function signature for a custom validator.
	 * @param control - The control to validate.
	 * @returns Validation errors if any, or null if the control is valid.
	 */
	(control: ControlT): ReturnType<ValidatorFn>;
}

export namespace CustomValidatorFn {
	export type B = {}
}
