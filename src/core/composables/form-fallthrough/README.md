<!-- todo: better docs -->

# Form Fallthrough

Passes a control from a control directive through.

## Usage

```ts
@Component({
  selector: 'my-percent-input',
  template: `
    <my-number-input
      [formControl]="form()"
      [label]="label()"
      [min]="0"
      [max]="100"
      [unit]="'%'"
    />
  `,
})
class MyPercentInputComponent {
  form = useFormFallthrough.required(FormControl<number>);

  label = input<string>();
}
```

## Types

```ts
export const useFormFallthrough: {
  <ControlT extends AbstractControl>(
    //
    controlCtor?: AbstractType<ControlT>,
  ): Signal<undefined | ControlT>;
  required: {
    <ControlT extends AbstractControl>(
      //
      ...args: Parameters<typeof useFormFallthrough<ControlT>>
    ): Signal<ControlT>;
  };
};
```
