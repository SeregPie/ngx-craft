import {AbstractControl, AsyncValidatorFn, ValidationErrors} from '@angular/forms';
import {isObservable, lastValueFrom} from 'rxjs';

/**
 * Bla bla bla.
 */
export interface CustomAsyncValidatorFn<
  ControlT extends AbstractControl = AbstractControl,
> {
  (control: ControlT): ReturnType<AsyncValidatorFn>;
}

/**
 * Bla bla bla.
 */
export const noopAsyncValidator: {
  (control: AbstractControl): Promise<null>;
} = async () => null;

/**
 * Bla bla bla.
 */
// todo: rename
export const stubAsyncValidator: {
  <const ErrorsT extends ValidationErrors>(
    errors: ErrorsT,
  ): {
    (control: AbstractControl): Promise<ErrorsT>;
  };
} = (errors) => async () => errors;

/**
 * Bla bla bla.
 */
export function withAsyncValidators<
  const ControlT extends AbstractControl,
>(
  control: ControlT,
  ...validators: CustomAsyncValidatorFn<ControlT>[]
): ControlT;

// @ts-ignore
export function withAsyncValidators(control, ...validators) {
  control.addAsyncValidators(validators);
  control.updateValueAndValidity();
  return control;
}

/**
 * Bla bla bla.
 */
export function composeAsyncValidators<
  const ControlT extends AbstractControl,
>(
  validators: ReadonlyArray<CustomAsyncValidatorFn<ControlT>>,
): CustomAsyncValidatorFn<ControlT>;

// @ts-ignore
export function composeAsyncValidators(validators) {
  switch (validators.length) {
    case 0:
      return noopAsyncValidator;
    case 1:
      return validators[0];
  }
  // @ts-ignore
  return async (control) => {
    for (let validator of validators) {
      let errors = await ((v) => isObservable(v) ? lastValueFrom(v) : v)(validator(control));
      if (errors != null) {
        return errors;
      }
    }
    return null;
  };
}
