// @ts-nocheck

import {AbstractControl, ValidationErrors, ValidatorFn} from '@angular/forms';

import * as impl from './impl';

export interface CustomValidatorFn<
	ControlT extends AbstractControl = AbstractControl,
> {
	(control: ControlT): ReturnType<ValidatorFn>;
}

export const stubValidator: {
	<ErrorsT extends null | ValidationErrors>(errors: ErrorsT): {
		(control: AbstractControl): ErrorsT;
	};
} = impl.stubValidator;

export const noopValidator: {
	(control: AbstractControl): null;
} = impl.noopValidator;

export const withValidators: {
	<ControlT extends AbstractControl>(
		control: ControlT,
		...validators: CustomValidatorFn<ControlT>[]
	): ControlT;
} = impl.withValidators;

export const composeValidators: {
	<ControlT extends AbstractControl>(
		validators: ReadonlyArray<CustomValidatorFn<ControlT>>,
	): CustomValidatorFn<ControlT>;
} = impl.composeValidators;

export * from './async';
