// @ts-nocheck

import {AbstractControl, AsyncValidatorFn, ValidationErrors} from '@angular/forms';
import {isObservable, lastValueFrom} from 'rxjs';

export interface CustomAsyncValidatorFn<
	ControlT extends AbstractControl = AbstractControl,
> {
	(control: ControlT): ReturnType<AsyncValidatorFn>;
}

export const noopAsyncValidator: {
	(control: AbstractControl): Promise<null>;
} = async () => null;

export const stubAsyncValidator: {
	<ErrorsT extends ValidationErrors>(errors: ErrorsT): {
		(control: AbstractControl): Promise<ErrorsT>;
	};
} = (errors) => async () => errors;

export const withAsyncValidators: {
	<ControlT extends AbstractControl>(
		control: ControlT,
		...validators: CustomAsyncValidatorFn<ControlT>[]
	): ControlT;
} = (control, ...validators) => {
	control.addAsyncValidators(validators);
	control.updateValueAndValidity();
	return control;
};

export const composeAsyncValidators: {
	<ControlT extends AbstractControl>(
		validators: ReadonlyArray<CustomAsyncValidatorFn<ControlT>>,
	): CustomAsyncValidatorFn<ControlT>;
} = (validators) => {
	switch (validators.length) {
		case 0:
			return noopAsyncValidator;
		case 1:
			return validators[0];
	}
	return async (control) => {
		for (let validator of validators) {
			let errors = await ((v) => isObservable(v) ? lastValueFrom(v) : v)(validator(control));
			if (errors != null) {
				return errors;
			}
		}
		return null;
	};
};
