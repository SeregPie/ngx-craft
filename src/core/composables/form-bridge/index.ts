import {Signal, WritableSignal} from '@angular/core';
import {ValidationErrors} from '@angular/forms';

export module useFormBridge {
	export type Result = {
		disabled: Signal<boolean>;
		pending: Signal<boolean>;
		errors: Signal<null | ValidationErrors>;
		touched: Signal<boolean>;
		touch: {(): void};
	};

	export type Options = Partial<{
		disabled: WritableSignal<boolean>;
		pending: Signal<boolean>;
		errors: Signal<null | ValidationErrors>;
	}>;
}

export const useFormBridge: {
	<ValueT>(
		value: WritableSignal<ValueT>,
		options?: useFormBridge.Options,
	): useFormBridge.Result;
} = null as any;
