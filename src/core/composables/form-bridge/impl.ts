import {effect, inject, signal} from '@angular/core';
import {NgControl} from '@angular/forms';

export default ((
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
}) as any;
