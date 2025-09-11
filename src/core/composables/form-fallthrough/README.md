<!-- todo: better docs -->

# Form Fallthrough

Passes a control from a control directive through.

`useFormFallthrough(controlCtor)`

`useFormFallthrough.required(...args)`

## Usage

```ts
@Component({
  selector: 'my-percent-input',
  template: `
    <my-number-input
      [formControl]="form()"
      [label]="label()"
      [suffix]="'%'"
      [min]="0"
      [max]="100"
    />
  `,
})
class MyPercentInputComponent {
  label = input<string>();

  form = useFormFallthrough.required(FormControl<number>);
}
```

## Types

<!-- prettier-ignore -->
```ts
export const useFormFallthrough: {
  <ControlT extends AbstractControl>(
    controlCtor?: AbstractType<ControlT>,
  ): Signal<undefined | ControlT>;
  required: {
    <ControlT extends AbstractControl>(
      ...args: Parameters<typeof useFormFallthrough<ControlT>>
    ): Signal<ControlT>;
  };
};
```
