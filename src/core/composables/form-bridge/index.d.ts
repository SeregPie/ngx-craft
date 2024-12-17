import {Signal, WritableSignal} from '@angular/core';
import {ValidationErrors} from '@angular/forms';

export function useFormBridge<
	//
	ValueT,
>(
	//
	value: WritableSignal<ValueT>,
	options?: useFormBridge.Options,
): useFormBridge.Result;

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
