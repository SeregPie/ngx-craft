// @ts-nocheck

import {Signal, WritableSignal} from '@angular/core';
import {ValidationErrors} from '@angular/forms';

export module useFormBridge {
	export type Options = Partial<{
		disabled: WritableSignal<boolean>;
		touched: WritableSignal<boolean>;
		pending: Signal<boolean>;
		errors: Signal<null | ValidationErrors>;
	}>;

	export type Result = {
		disabled: Signal<boolean>;
		touched: Signal<boolean>;
		pending: Signal<boolean>;
		errors: Signal<null | ValidationErrors>;
	};
}

export const useFormBridge: {
	<ValueT>(
		//
		value: WritableSignal<ValueT>,
		options?: useFormBridge.Options,
	): useFormBridge.Result;
} = () => {
	// todo: implement
};
