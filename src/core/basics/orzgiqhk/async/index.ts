import {AbstractControl, AsyncValidatorFn, ValidationErrors} from '@angular/forms';
import {isObservable, lastValueFrom} from 'rxjs';

export interface CustomAsyncValidatorFn<
	ControlT extends AbstractControl = AbstractControl,
> {
	(control: ControlT): ReturnType<AsyncValidatorFn>;
}

export const NoopAsyncValidator: {
	(control: AbstractControl): Promise<null>;
} = async () => null;

// todo: rename
export const FailAsyncValidator: {
	<ErrorsT extends ValidationErrors>(errors: ErrorsT): {
		(control: AbstractControl): Promise<ErrorsT>;
	};
} = (errors) => async () => errors;

export function withAsyncValidators<ControlT extends AbstractControl>(
	control: ControlT,
	...validators: CustomAsyncValidatorFn<ControlT>[]
): ControlT;

export function withAsyncValidators(
	control: AbstractControl,
	...validators: AsyncValidatorFn[]
) {
	control.addAsyncValidators(validators);
	control.updateValueAndValidity();
	return control;
}

export function composeAsyncValidators<ControlT extends AbstractControl>(
	validators: Readonly<Array<CustomAsyncValidatorFn<ControlT>>>,
): CustomAsyncValidatorFn<ControlT> {
	switch (validators.length) {
		case 0:
			return NoopAsyncValidator;
		case 1:
			return validators[0];
	}
	return async (control) => {
		for (let validator of validators) {
			let errors = await ((v) => (isObservable(v) ? lastValueFrom(v) : v))(validator(control));
			if (errors != null) {
				return errors;
			}
		}
		return null;
	};
}
