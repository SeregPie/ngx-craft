<!-- todo: better docs -->

# Provider Compitibility

`provide(token, {multi = false})`

Simplifies the definition of providers and extends it with type safety.

```ts
type MyTheme = 'Polaris' | 'Nebula';

let myThemeToken = new InjectionToken<MyTheme>('MyTheme');

@Component({
  providers: [provide(myThemeToken).useValue('Polaris')],
})
class MyComponent {}
```

## Types

<!-- prettier-ignore -->
```ts
export const provide: {
  <T>(
    token: ProviderToken<Array<T>>,
    options: provide.Options & {multi: true},
  ): ProviderChoice<T>;
  <T>(
    token: ProviderToken<T>,
    options?: provide.Options,
  ): ProviderChoice<T>;
};

export module provide {
  export type Options = Partial<{
    multi: boolean;
  }>;
}

export interface ProviderChoice<T> {
  useValue(source: T): ValueProvider;
  useFactory(source: {(): T}): FactoryProvider;
  useClass(source: Type<T>): ClassProvider;
  useExisting(source: ProviderToken<T>): ExistingProvider;
}
```
