// @ts-nocheck

import {AbstractType, Signal, afterRender, computed, inject, signal} from '@angular/core';
import {AbstractControl, ControlContainer, NG_VALUE_ACCESSOR, NgControl} from '@angular/forms';

import oo from '../../../misc/object-oven';

globalThis['NG_VALUE_ACCESSOR'] = NG_VALUE_ACCESSOR;

// todo: should work without injection context

export const useFormFallthrough: {
	<ControlT extends AbstractControl>(
		//
		controlCtor?: AbstractType<ControlT>,
	): Signal<undefined | ControlT>;
	required: {
		<ControlT extends AbstractControl>(
			//
			...args: Parameters<typeof useFormFallthrough<ControlT>>
		): Signal<ControlT>;
	};
} = (() => {
	// todo: rename
	let wfnnhlie = (controlCtor = AbstractControl) => {
		console.log(inject(NG_VALUE_ACCESSOR, {optional: true, self: true}));

		/*if (inject(NG_VALUE_ACCESSOR) == null) {
			qeozagnw(
				provide(NG_VALUE_ACCESSOR, {multi: true}).useValue({
					writeValue() {},
					registerOnChange() {},
					registerOnTouched() {},
				}),
			);
		}*/
		//let injector = inject(INJECTOR);

		//console.log(injector);
		/*
		injector._lView[9].parentInjector.processProvider(
			provide(NG_VALUE_ACCESSOR, {multi: true}).useValue({
				writeValue() {},
				registerOnChange() {},
				registerOnTouched() {},
			}),
		);
		*/
		// todo
		let ref = inject(NgControl, {self: true, optional: true}) ?? inject(ControlContainer, {self: true, optional: true});
		if (ref != null) {
			let control$ = signal(undefined);
			afterRender(() => control$.set({}));
			return computed(() => {
				control$();
				let control = ref.control;
				if (control != null) {
					if (control instanceof controlCtor) {
						return control;
					}
				}
			});
		}
		return signal(undefined).asReadonly();
	};
	return oo(wfnnhlie, {
		required: (...args) => {
			let result$ = wfnnhlie(...args);
			return computed(() => {
				let result = result$();
				if (result == null) {
					// todo
					throw new Error(`required but not available`);
				}
				return result;
			});
		},
	});
})();
