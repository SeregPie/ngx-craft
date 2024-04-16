import {
	AbstractControl,
	AsyncValidatorFn,
	ValidationErrors,
} from '@angular/forms';
import {isObservable, lastValueFrom} from 'rxjs';

export interface CustomAsyncValidatorFn<
	TControl extends AbstractControl = AbstractControl,
> {
	(control: TControl): ReturnType<AsyncValidatorFn>;
}

export const NoopAsyncValidator: {
	(control: AbstractControl): Promise<null>;
} = async () => null;

// prettier-ignore
// todo: rename
export const FailAsyncValidator: {
	<TErrors extends ValidationErrors>(errors: TErrors): {
		(control: AbstractControl): Promise<TErrors>;
	};
} = (errors) => async () => errors;

// prettier-ignore
export const withAsyncValidators: {
	<TControl extends AbstractControl>(
		control: TControl,
		validators: (
			| CustomAsyncValidatorFn<TControl>
			| Readonly<Array<CustomAsyncValidatorFn<TControl>>>
		),
	): TControl;
} = (control, validators) => {
	control.addAsyncValidators(validators as any);
	control.updateValueAndValidity();
	return control;
};

export const composeAsyncValidators: {
	<TControl extends AbstractControl>(
		validators: Readonly<Array<CustomAsyncValidatorFn<TControl>>>,
	): CustomAsyncValidatorFn<TControl>;
} = (validators) => {
	switch (validators.length) {
		case 0:
			return NoopAsyncValidator;
		case 1:
			return validators[0];
	}
	return async (control) => {
		for (let validator of validators) {
			let errors = await ((v) => (isObservable(v) ? lastValueFrom(v) : v))(
				validator(control),
			);
			if (errors != null) {
				return errors;
			}
		}
		return null;
	};
};
