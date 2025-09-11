<!-- todo: better docs -->

`useFormBridge(value, {disabled, touched, pending, errors})`

## Usage

```ts
@Component({})
class MyInputComponent<T> {
  value = model.required<T>();

  disabled = model<boolean>(false);

  // todo: better example
  invalid = computed(() => this.formBridge.errors() != null);

  formBridge = useFormBridge(this.value, {
    disabled = this.disabled,
  });
}
```

## Types

<!-- prettier-ignore -->
```ts
export const useFormBridge: {
  <ValueT>(
    value: WritableSignal<ValueT>,
    options?: useFormBridge.Options,
  ): useFormBridge.Result;
};

export module useFormBridge {
  export type Options = Partial<{
    disabled: WritableSignal<boolean>;
    touched: WritableSignal<boolean>;
    pending: Signal<boolean>;
    errors: Signal<null | ValidationErrors>;
  }>;

  export type Result = {
    disabled: Signal<boolean>;
    touched: Signal<boolean>;
    pending: Signal<boolean>;
    errors: Signal<null | ValidationErrors>;
  };
}
```
