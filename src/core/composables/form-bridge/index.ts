// @ts-nocheck

import {signal, Signal, WritableSignal} from '@angular/core';
import {ValidationErrors} from '@angular/forms';

export function useFormBridge<
	//
	ValueT,
>(
	//
	value: WritableSignal<ValueT>,
	options?: useFormBridge.Options,
): useFormBridge.Result;

export function useFormBridge(
	value,
	{
		//
		disabled = signal(false),
		touched = signal(false),
		pending = signal(false).asReadonly(),
		errors = signal(undefined).asReadonly(),
	} = {},
) {
	// todo
	throw 'not implemented yet';
}

export namespace useFormBridge {
	export type Options = Partial<{
		disabled: WritableSignal<boolean>;
		touched: WritableSignal<boolean>;
		pending: Signal<boolean>;
		errors: Signal<undefined | ValidationErrors>;
	}>;

	export type Result = {
		disabled: Signal<boolean>;
		touched: Signal<boolean>;
		pending: Signal<boolean>;
		errors: Signal<undefined | ValidationErrors>;
	};
}
