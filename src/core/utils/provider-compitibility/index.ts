// @ts-nocheck

import {ClassProvider, ExistingProvider, FactoryProvider, ProviderToken, Type, ValueProvider} from '@angular/core';

export type ProviderChoice<T> = {
	useValue(source: T): ValueProvider;
	useFactory(source: {(): T}): FactoryProvider;
	useClass(source: Type<T>): ClassProvider;
	useExisting(source: ProviderToken<T>): ExistingProvider;
};

export type ProvideOptions = Partial<{
	multi: boolean;
}>;

export const provide: {
	<T>(
		token: ProviderToken<Array<T>>,
		options: ProvideOptions & {multi: true},
	): ProviderChoice<T>;
	<T>(
		token: ProviderToken<T>,
		options?: ProvideOptions,
	): ProviderChoice<T>;
} = (() => {
	return (token, {
		multi = false,
	} = {}) => {
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
	};
})();
