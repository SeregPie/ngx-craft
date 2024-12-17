import {ClassProvider, ExistingProvider, FactoryProvider, ProviderToken, Type, ValueProvider} from '@angular/core';

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
): any {
	throw 'not implemented yet';
}

export namespace provide {
	export type Options = Partial<{
		multi: boolean;
	}>;
}

export enum ProviderType {
	Value = 'Value',
	Factory = 'Factory',
	useClass(source: Type<T>): ClassProvider;
	useExisting(source: ProviderToken<T>): ExistingProvider;
}

'Value', 'Factory', 'Class', 'Existing'

export interface ProviderChoice<T> {
	useValue(source: T): ValueProvider;
	useFactory(source: {(): T}): FactoryProvider;
	useClass(source: Type<T>): ClassProvider;
	useExisting(source: ProviderToken<T>): ExistingProvider;
}
