import {AbstractControl, ValidationErrors, ValidatorFn} from '@angular/forms';

export interface CustomValidatorFn<
	//
	ControlT extends AbstractControl = AbstractControl,
> {
	(control: ControlT): ReturnType<ValidatorFn>;
}

export const noopValidator: {
	(control: AbstractControl): null;
} = () => null;

export const stubValidator: {
	<const ErrorsT extends ValidationErrors>(
		errors: ErrorsT,
	): {
		(control: AbstractControl): ErrorsT;
	};
} = (errors) => () => errors;

export function withValidators<
	//
	const ControlT extends AbstractControl,
>(
	//
	control: ControlT,
	...validators: CustomValidatorFn<ControlT>[]
): ControlT;

export function withValidators(
	//
	control: AbstractControl,
	...validators: ValidatorFn[]
) {
	control.addValidators(validators);
	control.updateValueAndValidity();
	return control;
}

export function composeValidators<
	//
	const ControlT extends AbstractControl,
>(
	//
	validators: ReadonlyArray<CustomValidatorFn<ControlT>>,
): CustomValidatorFn<ControlT> {
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
