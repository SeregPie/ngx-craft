import {Signal, WritableSignal} from '@angular/core';
import {ValidationErrors} from '@angular/forms';

import * as impl from './impl';

export type FormBridgeResult = {
	disabled: Signal<boolean>;
	pending: Signal<boolean>;
	errors: Signal<null | ValidationErrors>;
	touched: Signal<boolean>;
	touch: {(): void};
};

export type FormBridgeOptions = Partial<{
	disabled: WritableSignal<boolean>;
	pending: Signal<boolean>;
	errors: Signal<null | ValidationErrors>;
}>;

export const useFormBridge: {
	<TValue>(
		value: WritableSignal<TValue>,
		options?: FormBridgeOptions,
	): FormBridgeResult;
} = impl.default;
