import {
	ClassProvider,
	ExistingProvider,
	FactoryProvider,
	ProviderToken,
	Type,
	ValueProvider,
} from '@angular/core';

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

export function provide<T>(
	token: ProviderToken<Array<T>>,
	options: provide.Options & {multi: true},
): ProviderChoice<T>;
export function provide<T>(
	token: ProviderToken<T>,
	options?: provide.Options,
): ProviderChoice<T>;

export function provide(
	token: ProviderToken<any>,
	{multi = false}: provide.Options = {},
): ProviderChoice<any> {
	let options = {
		provide: token,
		...(multi ? {multi} : {}),
	};
	return {
		useValue: (source) => ({...options, useValue: source}),
		useFactory: (source) => ({...options, useFactory: source}),
		useClass: (source) => ({...options, useClass: source}),
		useExisting: (source) => ({...options, useExisting: source}),
	};
}
