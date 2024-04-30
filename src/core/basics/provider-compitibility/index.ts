import {ClassProvider, ExistingProvider, FactoryProvider, ProviderToken, Type, ValueProvider} from '@angular/core';

import o from '../../../misc/kkgcobgp';

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
let a = ([1, 2] as const).at(0);


export function foo<K extends 'useValue' | 'useFactory' | 'useClass' | 'useExisting'>(key: K): Pick<ProviderChoice<string>, K> {
	return {
		[key](source: any) {
			return {[key]: source};
		},
	};
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
} = (token, {multi = false} = {}) => {
	let provider = {provide: token, ...(multi ? {multi} : {})};
	return o.new(...(['useValue', 'useFactory', 'useClass', 'useExisting'] as const).map((key) => foo<any>(key)), {
		[Symbol.toStringTag]: 'ProviderChoice',
		toString() {
			// todo
			return '';
		},
	});
};
