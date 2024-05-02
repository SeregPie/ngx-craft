// @ts-nocheck

import {ClassProvider, ExistingProvider, FactoryProvider, ProviderToken, Type, ValueProvider} from '@angular/core';

import oo, {toString} from '../../../misc/object-oven';

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
	// todo: rename
	let naepsxdi = ['useValue', 'useFactory', 'useClass', 'useExisting'];

	// todo: rename
	let unwkjhtw = {
		[Symbol.toStringTag]: 'ProviderChoice',
		toString,
	};

	return (token, {multi = false} = {}) => {
		// todo: rename
		let qnlgnadi = {provide: token, ...(multi ? {multi} : {})};
		// todo: rename
		let hpaphuld = naepsxdi.map((key) => ({
			[key](source) {
				return {...qnlgnadi, [key]: source};
			},
		}));
		return oo(...hpaphuld, unwkjhtw);
	};
})();
