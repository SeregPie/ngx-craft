# Validator Customization | Async

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
    validators: ReadonlyArray<CustomAsyncValidatorFn<ControlT>>,
  ): CustomAsyncValidatorFn<ControlT>;
};
```
