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

import {o} from '../../../misc/kkgcobgp';

export const useFormFallthrough: {
	<ControlT extends AbstractControl>(
		// todo: rename
		controlCtor?: AbstractType<ControlT>,
	): Signal<undefined | ControlT>;
	required: {
		<ControlT extends AbstractControl>(
			...args: Parameters<typeof useFormFallthrough<ControlT>>
		): Signal<ControlT>;
	};
} = o(
	(controlCtor = AbstractControl as any) => {
		let hubitguq = signal(undefined);
		let fromDirective = (ref: AbstractControlDirective) => {
			let xhskcqcu = () => {
				if (ref.control != null) {
					if (ref.control instanceof controlCtor) {
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
	},
	{
		required<ControlT extends AbstractControl>(
			...args: Parameters<typeof useFormFallthrough<ControlT>>
		) {
			let result$ = useFormFallthrough<ControlT>(...args);
			return computed(() => {
				let result = result$();
				if (result == null) {
					throw new Error(`required but not available`);
				}
				return result;
			});
		},
	},
);
