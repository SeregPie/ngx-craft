<!-- todo: better docs -->

# Media Query

`useMediaQuery(query)`

## Usage

```ts
const dark$ = useMediaQuery('(prefers-color-scheme: dark)');
```

## Types

```ts
export const useMediaQuery: {
  (query: MaybeSignal<string>): Signal<boolean>;
  readonly supported: boolean;
};
```
