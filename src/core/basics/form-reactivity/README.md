<!-- todo: better docs -->

# Form Reactivity

`formi(control)`

```ts
@Component({})
class MyComponent {
  form = useFormFallthrough();

  error = computed(() => {
    let form = this.form();
    if (form && formi(form).touched && formi(form).invalid) {
      let errors = formi(form).errors;
      if (errors) {
        if (errors['required']) {
          return 'The input is required.';
        }
      }
      return 'The input is invalid.';
    }
    return null;
  });
}
```

## Types

<!-- prettier-ignore -->
```ts
export const formi: {
  <ControlT extends AbstractControl>(
    control: ControlT,
  ): ReadonlyReactiveFormProxy<ControlT>;
};

export type ReadonlyReactiveFormProxy<
  ControlT extends AbstractControl = AbstractControl,
> = (
  & {
    readonly control: ControlT;
  }
  & Readonly<Pick<ControlT, ReadonlyReactiveFormProp>>
);

export type ReadonlyReactiveFormProp = (
  | 'status'
  | 'valid'
  | 'invalid'
  | 'pending'
  | 'disabled'
  | 'enabled'
  | 'pristine'
  | 'dirty'
  | 'touched'
  | 'untouched'
  | 'value'
  | 'errors'
);
```
