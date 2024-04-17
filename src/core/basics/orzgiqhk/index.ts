import {AbstractControl, ValidationErrors, ValidatorFn} from '@angular/forms';

export interface CustomValidatorFn<
	TControl extends AbstractControl = AbstractControl,
> {
	(control: TControl): ReturnType<ValidatorFn>;
}

export const NoopValidator: {
	(control: AbstractControl): null;
} = () => null;

// todo: rename
export const FailValidator: {
	<TErrors extends ValidationErrors>(errors: TErrors): {
		(control: AbstractControl): TErrors;
	};
} = (errors) => () => errors;

export const withValidators: {
	<TControl extends AbstractControl>(
		control: TControl,
		validators: (
			| CustomValidatorFn<TControl>
			| Readonly<Array<CustomValidatorFn<TControl>>>
		),
	): TControl;
} = (control, validators) => {
	control.addValidators(validators as any);
	control.updateValueAndValidity();
	return control;
};

export const composeValidators: {
	<TControl extends AbstractControl>(
		validators: Readonly<Array<CustomValidatorFn<TControl>>>,
	): CustomValidatorFn<TControl>;
} = (validators) => {
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
};

export * from './async';
