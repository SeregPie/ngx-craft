import {Signal, WritableSignal, effect, inject, signal} from '@angular/core';
import {NgControl, ValidationErrors} from '@angular/forms';

export type FormBridgeResult = {
	disabled: Signal<boolean>;
	pending: Signal<boolean>;
	errors: Signal<undefined | ValidationErrors>;
	touched: Signal<boolean>;
	touch: {(): void};
};

export type FormBridgeOptions = Partial<{
	disabled: WritableSignal<boolean>;
	pending: Signal<boolean>;
	errors: Signal<undefined | ValidationErrors>;
}>;

export const useFormBridge: {
	<TValue>(
		value: WritableSignal<TValue>,
		options?: FormBridgeOptions,
	): FormBridgeResult;
} = (
	value$,
	{
		disabled: disabled$ = signal(false),
		pending: pending$ = signal(false).asReadonly(),
		errors: errors$ = signal(undefined).asReadonly(),
	} = {},
) => {
	let ref = inject(NgControl, {self: true, optional: true});
	if (ref != null) {
		let value = value$();
		let handleOnChange = () => {};
		// prettier-ignore
		effect(() => {
			let v = value$();
			if (value !== v) {
				handleOnChange(value = v);
			}
		}, {allowSignalWrites: true});
		let handleOnTouched = () => {};
		effect(
			() => {
				// todo
			},
			{allowSignalWrites: true},
		);
		ref.valueAccessor = {
			writeValue(v) {
				// prettier-ignore
				value$.set(value = v);
			},
			registerOnChange(fn) {
				handleOnChange = fn;
			},
			registerOnTouched(fn) {
				handleOnTouched = fn;
			},
			setDisabledState(v) {
				disabled$.set(v);
			},
		};
	}
	return {
		disabled: disabled$.asReadonly(),
	};
};
