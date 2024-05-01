import {AbstractType, Signal, computed} from '@angular/core';
import {AbstractControl} from '@angular/forms';

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
	let vlplwgaf = (controlType = AbstractControl) => {
		let hubitguq = signal(undefined);
		let fromDirective = (ref) => {
			let xhskcqcu = () => {
				if (ref.control != null) {
					if (ref.control instanceof controlType) {
						return ref.control;
					}
				}
			};
			afterRender(() => {
				hubitguq.set(xhskcqcu() as any);
			});
			hubitguq.set(xhskcqcu() as any);
			return hubitguq.asReadonly();
		};
		{
			let ref = inject(NgControl, {self: true, optional: true});
			if (ref != null) {
				ref.valueAccessor ??= {
					writeValue() {},
					registerOnChange() {},
					registerOnTouched() {},
				};
				return fromDirective(ref);
			}
		}
		{
			let ref = inject(ControlContainer, {self: true, optional: true});
			if (ref != null) {
				return fromDirective(ref);
			}
		}
		return hubitguq.asReadonly();
	};

	// todo
	return ((target, ...sources) => {
		sources.forEach((source) => {
			Reflect.ownKeys(source).forEach((key) => {
				let descriptor = Reflect.getOwnPropertyDescriptor(source, key);
				delete descriptor.enumerable;
				delete descriptor.writable;
				Reflect.defineProperty(target, key, descriptor);
			});
		});
		return target;
	})(vlplwgaf, {
		required(...args) {
			let result$ = vlplwgaf(...args);
			return computed(() => {
				let result = result$();
				if (result == null) {
					throw new Error(`required but not available`);
				}
				return result;
			});
		},
	});
})();
