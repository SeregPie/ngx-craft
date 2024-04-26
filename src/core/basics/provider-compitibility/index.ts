import {ClassProvider, ExistingProvider, FactoryProvider, ProviderToken, Type, ValueProvider} from '@angular/core';

import * as impl from './impl';

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
} = impl.default;
