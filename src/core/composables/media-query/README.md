<!-- todo: better docs -->

# Media Query

## Usage

```ts
let dark$ = useMediaQuery('(prefers-color-scheme: dark)');
```

## Types

```ts
export const useMediaQuery: {
  (query: string): Signal<boolean>;
};
```
