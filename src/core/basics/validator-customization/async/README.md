<!-- todo: better docs -->

# Validator Customization | Async

`withAsyncValidators(control, ...validators)`

Adds a typed asynchronous validator to a control.

---

`composeAsyncValidators(validators)`

Composes multiple asynchronous validators into one.

## Types

<!-- prettier-ignore -->
```ts
export interface CustomAsyncValidatorFn<
  ControlT extends AbstractControl = AbstractControl,
> {
  (control: ControlT): ReturnType<AsyncValidatorFn>;
}

export const noopAsyncValidator: {
  (control: AbstractControl): Promise<null>;
};

export const stubAsyncValidator: {
  <ErrorsT extends ValidationErrors>(errors: ErrorsT): {
    (control: AbstractControl): Promise<ErrorsT>;
  };
};

export const withAsyncValidators: {
  <ControlT extends AbstractControl>(
    control: ControlT,
    ...validators: CustomAsyncValidatorFn<ControlT>[]
  ): ControlT;
};

export const composeAsyncValidators: {
  <ControlT extends AbstractControl>(
    validators: Readonly<Array<CustomAsyncValidatorFn<ControlT>>>,
  ): CustomAsyncValidatorFn<ControlT>;
};
```
