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

export type ProvideOptions = Partial<{
	multi: boolean;
}>;

export const provide = (() => {
	function impl<T>(
		token: ProviderToken<Array<T>>,
		options: ProvideOptions & {multi: true},
	): ProviderChoice<T>;
	function impl<T>(
		token: ProviderToken<T>,
		options?: ProvideOptions,
	): ProviderChoice<T>;
	function impl<T>(
		token: ProviderToken<T>,
		{multi = false}: ProvideOptions = {},
	): ProviderChoice<T> {
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
	return impl;
})();
