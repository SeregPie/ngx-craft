<!-- todo: better docs -->

# Validator Customization

`withValidators(control, ...validators)`

Adds a typed validator to a control.

`composeValidators(validators)`

Composes multiple validators into one.

## Usage

```ts
const form = new FormGroup({
  email: new FormControl<null | string>(null, {
    validators: [Validators.required, Validators.email],
  }),
  password: withValidators(
    new FormGroup({
      actual: new FormControl<null | string>(null, {
        validators: [Validators.required, Validators.minLength(8)],
      }),
      verify: new FormControl<null | string>(null),
    }),
    (form) => {
      if (form.controls.actual.value !== form.controls.verify.value) {
        return {error: 'Passwords do not match.'};
      }
      return null;
    },
  ),
});
```

---

```ts
const form = new FormControl<null | number>(null, {
  validators: composeValidators([
    //
    Validators.required,
    Validators.min(0),
    Validators.max(100),
  ]),
});
```

## Types

<!-- prettier-ignore -->
```ts
export interface CustomValidatorFn<
  ControlT extends AbstractControl = AbstractControl,
> {
  (control: ControlT): ReturnType<ValidatorFn>;
}

export const noopValidator: {
  (control: AbstractControl): null;
};

export const stubValidator: {
  <ErrorsT extends ValidationErrors>(errors: ErrorsT): {
    (control: AbstractControl): ErrorsT;
  };
};

export const withValidators: {
  <ControlT extends AbstractControl>(
    control: ControlT,
    ...validators: CustomValidatorFn<ControlT>[]
  ): ControlT;
};

export const composeValidators: {
  <ControlT extends AbstractControl>(
    validators: Readonly<Array<CustomValidatorFn<ControlT>>>,
  ): CustomValidatorFn<ControlT>;
};
```
