// @ts-nocheck

import {AbstractControl, AsyncValidatorFn, ValidationErrors} from '@angular/forms';

import * as impl from './impl';

export interface CustomAsyncValidatorFn<
	//
	ControlT extends AbstractControl = AbstractControl,
> {
	(control: ControlT): ReturnType<AsyncValidatorFn>;
}

export const stubAsyncValidator: {
	<ErrorsT extends null | ValidationErrors>(
		errors: ErrorsT,
	): {
		(control: AbstractControl): Promise<ErrorsT>;
	};
} = impl.stubAsyncValidator;

export const noopAsyncValidator: {
	(control: AbstractControl): Promise<null>;
} = impl.noopAsyncValidator;

export const withAsyncValidators: {
	<ControlT extends AbstractControl>(
		//
		control: ControlT,
		...validators: CustomAsyncValidatorFn<ControlT>[]
	): ControlT;
} = impl.withAsyncValidators;

export const composeAsyncValidators: {
	<ControlT extends AbstractControl>(
		//
		validators: ReadonlyArray<CustomAsyncValidatorFn<ControlT>>,
	): CustomAsyncValidatorFn<ControlT>;
} = impl.composeAsyncValidators;
