import {ClassProvider, ExistingProvider, FactoryProvider, ProviderToken, Type, ValueProvider} from '@angular/core';

import oo from '../../../misc/object-oven';

export const provide: {
	<T>(
		//
		token: ProviderToken<Array<T>>,
		options: provide.Options & {multi: true},
	): ProviderChoice<T>;
	<T>(
		//
		token: ProviderToken<T>,
		options?: provide.Options,
	): ProviderChoice<T>;
} = (() => {
	let types = ['Value', 'Factory', 'Class', 'Existing']; // todo: rename?
	let methods = types.map((type) => `use${type}`); // todo: rename?
	return (token, {multi = false} = {}) => {
		let partials = {provide: token, ...(multi ? {multi} : {})}; // todo: rename?
		return oo.new(
			...methods.map((key) => ({
				[key]: (source) => ({...partials, [key]: source}),
			})),
		);
	};
})();

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
