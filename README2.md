# Validator Customization

## Usage

```ts
const form = withValidators(
  new FormGroup({
    password: new FormControl<null | string>(null, {
      validators: [Validators.required, Validators.minLength(8)],
    }),
    confirmPassword: new FormControl<null | string>(null),
  }),
  (form) => {
    if (form.controls.password.valid) {
      if (form.controls.password.value !== form.controls.verify.value) {
        return {error: 'Passwords do not match.'};
      }
    }
    return null;
  },
);
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

```ts
export interface CustomValidatorFn<
  //
  ControlT extends AbstractControl = AbstractControl,
> {
  (control: ControlT): ReturnType<ValidatorFn>;
}

export const noopValidator: {
  (control: AbstractControl): null;
};

export const stubValidator: {
  <ErrorsT extends ValidationErrors>(
    errors: ErrorsT,
  ): {
    //
    (control: AbstractControl): ErrorsT;
  };
};

export const withValidators: {
  <ControlT extends AbstractControl>(
    //
    control: ControlT,
    ...validators: CustomValidatorFn<ControlT>[]
  ): ControlT;
};

export const composeValidators: {
  <ControlT extends AbstractControl>(validators: ReadonlyArray<CustomValidatorFn<ControlT>>): CustomValidatorFn<ControlT>;
};
```
