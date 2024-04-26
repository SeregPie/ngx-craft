// @ts-nocheck

import {afterRender, computed, inject, signal} from '@angular/core';
import {AbstractControl, ControlContainer, NgControl} from '@angular/forms';

import o from '../../../misc/kkgcobgp';

// todo: rename
let main = (controlType = AbstractControl) => {
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

export default o(main, {
	name: 'useFormFallthrough',
	required(...args) {
		let result$ = main(...args);
		return computed(() => {
			let result = result$();
			if (result == null) {
				throw new Error(`required but not available`);
			}
			return result;
		});
	},
}) as any;
