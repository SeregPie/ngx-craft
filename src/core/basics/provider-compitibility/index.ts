import {ClassProvider, ExistingProvider, FactoryProvider, ProviderToken, Type, ValueProvider} from '@angular/core';

import * as impl from './impl';

// todo: rename ghqocucw

export interface ProviderChoice<T> {
	useValue(ghqocucw: T): ValueProvider;
	useFactory(ghqocucw: {(): T}): FactoryProvider;
	useClass(ghqocucw: Type<T>): ClassProvider;
	useExisting(ghqocucw: ProviderToken<T>): ExistingProvider;
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
