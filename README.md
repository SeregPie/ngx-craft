# ngx-craft

Everything to make your work with Angular easier.

## Setup

```sh
npm i ngx-craft
```

---

```ts
import {provide} from 'ngx-craft';
```

## API

### Provider Compitibility

Simplifies the definition of providers and extends it with type safety.

#### Types

<!-- prettier-ignore -->
```ts
type ProviderChoice<T> = {
  useValue(source: T): ValueProvider;
  useFactory(source: {(): T}): FactoryProvider;
  useClass(source: Type<T>): ClassProvider;
  useExisting(source: ProviderToken<T>): ExistingProvider;
};

type ProvideOptions = Partial<{
	multi: boolean;
}>;

const provide: {
  <T>(
    token: ProviderToken<Array<T>>,
    options: ProvideOptions & {multi: true},
  ): ProviderChoice<T>;
  <T>(
    token: ProviderToken<T>,
    options?: ProvideOptions,
  ): ProviderChoice<T>;
};
```

#### Usage

<!-- prettier-ignore -->
```ts
type MyTheme = 'Polaris' | 'Nebula';

const MyThemeToken = new InjectionToken<MyTheme>('MyTheme');

@Component({
  providers: [provide(MyThemeToken).useValue('Polaris')],
})
class MyComponent {}
```
