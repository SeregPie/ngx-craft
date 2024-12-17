import {AbstractControl, AsyncValidatorFn, ValidationErrors} from '@angular/forms';

export interface CustomAsyncValidatorFn<
	//
	ControlT extends AbstractControl = AbstractControl,
> {
	(control: ControlT): ReturnType<AsyncValidatorFn>;
}

export const noopAsyncValidator: {
	(control: AbstractControl): Promise<null>;
};

export const stubAsyncValidator: {
	<const ErrorsT extends ValidationErrors>(
		errors: ErrorsT,
	): {
		(control: AbstractControl): Promise<ErrorsT>;
	};
};

export function withAsyncValidators<
	//
	const ControlT extends AbstractControl,
>(
	//
	control: ControlT,
	...validators: CustomAsyncValidatorFn<ControlT>[]
): ControlT;

export function composeAsyncValidators<
	//
	const ControlT extends AbstractControl,
>(
	//
	validators: ReadonlyArray<CustomAsyncValidatorFn<ControlT>>,
): CustomAsyncValidatorFn<ControlT>;
