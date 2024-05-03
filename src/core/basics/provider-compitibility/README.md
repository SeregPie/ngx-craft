# Provider Compitibility

Simplifies the definition of providers and extends it with type safety.

## Usage

```ts
type MyTheme = 'Polaris' | 'Nebula';

const MyThemeToken = new InjectionToken<MyTheme>('MyTheme');

@Component({
  providers: [provide(MyThemeToken).useValue('Polaris')],
})
class MyComponent {}
```

## Types

```ts
export interface ProviderChoice<T> {
  useValue(source: T): ValueProvider;
  useFactory(source: {(): T}): FactoryProvider;
  useClass(source: Type<T>): ClassProvider;
  useExisting(source: ProviderToken<T>): ExistingProvider;
}

export module provide {
  export type Options = Partial<{
    multi: boolean;
  }>;
}

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
```
