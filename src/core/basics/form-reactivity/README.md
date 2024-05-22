# Form Reactivity

`formi(control)`

```ts
const formResult = computed(() => {
  if (formi(form).valid) {
    return formi(form).value;
  }
  return null;
});
```

## Types

<!-- prettier-ignore -->
```ts
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

export type ReadonlyReactiveFormProxy<
  ControlT extends AbstractControl = AbstractControl,
> = (
  & {
    readonly control: ControlT;
  }
  & Readonly<Pick<ControlT, ReadonlyReactiveFormProp>>
);

export const formi: {
  <ControlT extends AbstractControl>(
    control: ControlT,
  ): ReadonlyReactiveFormProxy<ControlT>;
};
```
