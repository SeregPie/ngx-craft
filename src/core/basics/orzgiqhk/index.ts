import {AbstractControl, ValidationErrors, ValidatorFn} from '@angular/forms';

export interface CustomValidatorFn<
	//
	ControlT extends AbstractControl = AbstractControl,
> {
	(control: ControlT): ReturnType<ValidatorFn>;
}

export const stubValidator: {
	<ErrorsT extends null | ValidationErrors>(
		errors: ErrorsT,
	): {
		(control: AbstractControl): ErrorsT;
	};
} = (errors) => () => errors;

export const noopValidator = stubValidator(null);

export const withValidators: {
	<ControlT extends AbstractControl>(
		//
		control: ControlT,
		...validators: CustomValidatorFn<ControlT>[]
	): ControlT;
} = (control, ...validators) => {
	control.addValidators(validators);
	control.updateValueAndValidity();
	return control;
};

export const composeValidators: {
	<ControlT extends AbstractControl>(
		//
		validators: ReadonlyArray<CustomValidatorFn<ControlT>>,
	): CustomValidatorFn<ControlT>;
} = (validators) => {
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
};

export * from './async';
