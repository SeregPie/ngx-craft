<!-- todo: better docs -->

# Media Query

`useMediaQuery(query)`

## Usage

```ts
class MyComponent {
  dark = useMediaQuery('(prefers-color-scheme: dark)');
}
```

## Types

<!-- prettier-ignore -->
```ts
export function useMediaQuery(
  query: MaybeSignal<string>,
): Signal<boolean>;
```
