<!-- todo: better docs -->

# Media Query

`useMediaQuery(query)`

## Usage

```ts
@Component({})
class MyComponent {
  dark = useMediaQuery('(prefers-color-scheme: dark)');
}
```

## Types

```ts
export const useMediaQuery: {
  (query: MaybeSignal<string>): Signal<boolean>;
  readonly supported: boolean;
};
```
