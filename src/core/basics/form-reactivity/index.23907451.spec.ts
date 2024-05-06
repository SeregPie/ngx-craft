import {effect} from '@angular/core';
import {TestBed, fakeAsync} from '@angular/core/testing';
import {FormControl, FormGroup, Validators} from '@angular/forms';

import {formi} from '.';

describe('formi', () => {
	it('should reflect actual state', fakeAsync(async () => {
		let form = new FormGroup({
			a: new FormControl<null | number>(null, {
				validators: Validators.required,
			}),
			b: new FormControl<null | string>(null, {
				validators: Validators.required,
			}),
		});

		for await (let _ of (async function* () {
			yield;
			for (let fn of [
				() => form.disable(),
				() => form.enable(),
				() => form.controls.a.disable(),
				() => form.controls.a.enable(),
				() => form.markAsDirty(),
				() => form.markAsPristine(),
				() => form.controls.a.markAsDirty(),
				() => form.controls.a.markAsPristine(),
				() => form.reset(),
				() => form.markAsTouched(),
				() => form.markAsUntouched(),
				() => form.controls.a.markAsTouched(),
				() => form.controls.a.markAsUntouched(),
				() => form.reset(),
			]) {
				fn();
				yield;
			}
		})()) {
			([form, form.controls.a, form.controls.b] as const).forEach((form) => {
				(['status', 'valid', 'invalid', 'pending', 'disabled', 'enabled', 'pristine', 'dirty', 'touched', 'untouched', 'value', 'errors'] as const).forEach((key) => {
					expect(formi(form)[key]).toBe(form[key]);
				});
			});
		}
	}));

	it('should trigger changes properly', fakeAsync(async () => {
		let form = new FormControl(null);

		let effectFn = jest.fn(() => {
			formi(form).disabled;
		});
		TestBed.runInInjectionContext(() => {
			effect(effectFn);
		});
		TestBed.flushEffects();
		jest.clearAllMocks()

		form.disable();
		form.markAsTouched();
		TestBed.flushEffects();

		expect(effectFn).toHaveBeenCalledTimes(1);
		jest.clearAllMocks()

		form.disable();
		form.markAsUntouched();
		TestBed.flushEffects();

		expect(effectFn).not.toHaveBeenCalled();
		jest.clearAllMocks()

		form.enable();
		form.markAsUntouched();
		TestBed.flushEffects();

		expect(effectFn).toHaveBeenCalledTimes(1);
		jest.clearAllMocks()

		form.enable();
		form.markAsTouched();
		TestBed.flushEffects();

		expect(effectFn).not.toHaveBeenCalled();
		jest.clearAllMocks()
	}));

	it('should have target control', fakeAsync(async () => {
		let form = new FormControl(null);

		expect(formi(form).control).toBe(form);
	}));

	it('should re-use instance', fakeAsync(async () => {
		let form = new FormControl(null);

		expect(formi(form)).toBe(formi(form));
	}));
});
