import {ClassProvider, ExistingProvider, FactoryProvider, ProviderToken, Type, ValueProvider} from '@angular/core';

export function provide<T>(
	//
	token: ProviderToken<Array<T>>,
	options: provide.Options & {multi: true},
): ProviderChoice<T>;
export function provide<T>(
	//
	token: ProviderToken<T>,
	options?: provide.Options,
): ProviderChoice<T>;
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
