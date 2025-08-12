import {AbstractControl, ValidationErrors, ValidatorFn} from '@angular/forms';

/**
 * Bla bla bla.
 * @template ControlT Bla bla bla.
 */
export interface CustomValidatorFn<
  //
  ControlT extends AbstractControl = AbstractControl,
> {
  /**
   * Bla bla bla.
   * @param control Bla bla bla.
   * @returns Bla bla bla.
   */
  (control: ControlT): ReturnType<ValidatorFn>;
}

/**
 * Bla bla bla.
 */
export const noopValidator: {
  (control: AbstractControl): null;
} = () => null;

/**
 * Bla bla bla.
 * @template ErrorsT Bla bla bla.
 * @param errors Bla bla bla.
 * @returns Bla bla bla.
 */
// todo: rename
export const stubValidator: {
  <const ErrorsT extends ValidationErrors>(
    errors: ErrorsT,
  ): {
    /**
     * Bla bla bla.
     * @param control Bla bla bla.
     * @returns Bla bla bla.
     */
    (control: AbstractControl): ErrorsT;
  };
} = (errors) => () => errors;

/**
 * Bla bla bla.
 * @template ControlT Bla bla bla.
 * @param control Bla bla bla.
 * @param validators Bla bla bla.
 * @returns Bla bla bla.
 */
export function withValidators<
  //
  const ControlT extends AbstractControl,
>(
  //
  control: ControlT,
  ...validators: CustomValidatorFn<ControlT>[]
): ControlT;

// @ts-ignore
export function withValidators(control, ...validators) {
  control.addValidators(validators);
  control.updateValueAndValidity();
  return control;
}

/**
 * Bla bla bla.
 * @template ControlT Bla bla bla.
 * @param validators Bla bla bla.
 * @returns Bla bla bla.
 */
export function composeValidators<
  const ControlT extends AbstractControl,
>(
  validators: ReadonlyArray<CustomValidatorFn<ControlT>>,
): CustomValidatorFn<ControlT>;

// @ts-ignore
export function composeValidators(validators) {
  switch (validators.length) {
    case 0:
      return noopValidator;
    case 1:
      return validators[0];
  }
  // @ts-ignore
  return (control) => {
    for (let validator of validators) {
      let errors = validator(control);
      if (errors != null) {
        return errors;
      }
    }
    return null;
  };
}

export * from './async';
