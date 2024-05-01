// @ts-nocheck

import {ClassProvider, ExistingProvider, FactoryProvider, ProviderToken, Type, ValueProvider} from '@angular/core';

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
		toString() {
			// todo
			return '';
		},
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
		// todo
		return ((...sources) => {
			let target = {};
			sources.forEach((source) => {
				Reflect.ownKeys(source).forEach((key) => {
					let descriptor = Reflect.getOwnPropertyDescriptor(source, key);
					delete descriptor.enumerable;
					delete descriptor.writable;
					Reflect.defineProperty(target, key, descriptor);
				});
			});
			return target;
		})(...hpaphuld, unwkjhtw);
	};
})();
