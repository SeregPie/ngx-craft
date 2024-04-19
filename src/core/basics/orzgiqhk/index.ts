import {AbstractControl, ValidationErrors, ValidatorFn} from '@angular/forms';

export interface CustomValidatorFn<
	ControlT extends AbstractControl = AbstractControl,
> {
	(control: ControlT): ReturnType<ValidatorFn>;
}

export const NoopValidator: {
	(control: AbstractControl): null;
} = () => null;

// todo: rename
export const FailValidator: {
	<ErrorsT extends ValidationErrors>(errors: ErrorsT): {
		(control: AbstractControl): ErrorsT;
	};
} = (errors) => () => errors;

export function withValidators<ControlT extends AbstractControl>(
	control: ControlT,
	...validators: CustomValidatorFn<ControlT>[]
): ControlT;

export function withValidators(
	control: AbstractControl,
	...validators: ValidatorFn[]
) {
	control.addValidators(validators);
	control.updateValueAndValidity();
	return control;
}

export function composeValidators<ControlT extends AbstractControl>(
	validators: Readonly<Array<CustomValidatorFn<ControlT>>>,
): CustomValidatorFn<ControlT> {
	switch (validators.length) {
		case 0:
			return NoopValidator;
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
