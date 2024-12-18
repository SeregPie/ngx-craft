import {ClassProvider, ExistingProvider, FactoryProvider, Provider, ProviderToken, Type, ValueProvider} from '@angular/core';

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

export function provide(
	//
	token: ProviderToken<any>,
	{
		//
		multi = false,
	}: provide.Options = {},
) {
	let provider: Partial<Provider> = {provide: token}; // todo: rename?
	if (multi) {
		provider.multi = true;
	}
	return <ProviderChoice<any>>{
		useValue: (source) => ({...provider, useValue: source}),
		useFactory: (source) => ({...provider, useFactory: source}),
		useClass: (source) => ({...provider, useClass: source}),
		useExisting: (source) => ({...provider, useExisting: source}),
	};
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
