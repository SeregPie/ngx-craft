import {
	AbstractType,
	Signal,
	afterRender,
	computed,
	inject,
	signal,
} from '@angular/core';
import {
	AbstractControl,
	AbstractControlDirective,
	ControlContainer,
	NgControl,
} from '@angular/forms';

export const useFormFallthrough = (() => {
	function impl<TControl extends AbstractControl>(
		controlCtor?: AbstractType<TControl>,
	): Signal<undefined | TControl>;
	function impl(
		controlCtor: AbstractType<AbstractControl> = AbstractControl,
	): Signal<undefined | AbstractControl> {
		// todo: rename
		let vozrwodm = (ref: AbstractControlDirective) => {
			let watch = signal({});
			afterRender(() => {
				watch.set({});
			});
			return computed(() => {
				watch();
				if (ref.control != null) {
					if (ref.control instanceof controlCtor) {
						return ref.control;
					}
				}
			});
		};
		{
			let ref = inject(NgControl, {self: true, optional: true});
			if (ref != null) {
				ref.valueAccessor ??= {
					writeValue() {},
					registerOnChange() {},
					registerOnTouched() {},
				};
				return vozrwodm(ref);
			}
		}
		{
			let ref = inject(ControlContainer, {self: true, optional: true});
			if (ref != null) {
				return vozrwodm(ref);
			}
		}
		return signal(undefined).asReadonly();
	}
	return Object.assign(impl, {
		required: (() => {
			function impl<TControl extends AbstractControl>(
				...args: Parameters<typeof useFormFallthrough<TControl>>
			): Signal<TControl> {
				let result$ = useFormFallthrough<TControl>(...args);
				return computed(() => {
					let result = result$();
					if (result == null) {
						// todo: message
						throw new Error(`required but not available`);
					}
					return result;
				});
			}
			return impl;
		})(),
	});
})();
