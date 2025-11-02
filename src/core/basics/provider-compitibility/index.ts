// @ts-nocheck

import type {ClassProvider, ExistingProvider, FactoryProvider, ProviderToken, Type, ValueProvider} from '@angular/core';

export function provide<T>(
  token: ProviderToken<ReadonlyArray<T>>,
  options: provide.Options & {multi: true},
): ProviderChoice<T>;

export function provide<T>(
  token: ProviderToken<T>,
  options?: provide.Options,
): ProviderChoice<T>;

export function provide(token, {multi = false} = {}) {
  let base = {provide: token};
  if (multi) {
    base.multi = true;
  }
  let choice = {};
  ['Value', 'Factory', 'Class', 'Existing'].forEach((type) => {
    let method = `use${type}`;
    choice[method] = (source) => ({...base, [method]: source});
  });
  return choice;
}

export namespace provide {
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
