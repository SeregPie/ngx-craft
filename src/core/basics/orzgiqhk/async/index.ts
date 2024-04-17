import {
	AbstractControl,
	AsyncValidatorFn,
	ValidationErrors,
} from '@angular/forms';
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

export const withAsyncValidators: {
	<ControlT extends AbstractControl>(
		control: ControlT,
		validators: (
			| CustomAsyncValidatorFn<ControlT>
			| Readonly<Array<CustomAsyncValidatorFn<ControlT>>>
		),
	): ControlT;
} = (control, validators) => {
	control.addAsyncValidators(validators as any);
	control.updateValueAndValidity();
	return control;
};

export const composeAsyncValidators: {
	<ControlT extends AbstractControl>(
		validators: Readonly<Array<CustomAsyncValidatorFn<ControlT>>>,
	): CustomAsyncValidatorFn<ControlT>;
} = (validators) => {
	switch (validators.length) {
		case 0:
			return NoopAsyncValidator;
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
