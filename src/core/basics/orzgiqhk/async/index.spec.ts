import {fakeAsync, tick} from '@angular/core/testing';
import {FormControl} from '@angular/forms';

import {spy} from '../../../../misc/test';
import {composeAsyncValidators, noopAsyncValidator, withAsyncValidators} from './';

describe('withAsyncValidators', () => {
	it('should work', fakeAsync(async () => {
		let form = withAsyncValidators(
			new FormControl<number>(1, {
				nonNullable: true,
			}),
			async ({value}) => (value % 2 ? {error: true} : null),
		);

		expect(form.pending).toBe(true);

		tick();

		expect(form.errors).toEqual({error: true});

		form.setValue(2);

		expect(form.pending).toBe(true);

		tick();

		expect(form.errors).toBeNull();
	}));

	it('should contain validators', fakeAsync(async () => {
		let form = new FormControl(null);
		let validators = [async () => null, async () => null];
		withAsyncValidators(form, ...validators);

		for (let validator of validators) {
			expect(form.hasAsyncValidator(validator)).toBe(true);
		}
	}));

	it('should call validators only once', fakeAsync(async () => {
		let form = new FormControl(null);
		let validators = [async () => null, async () => null].map((fn) => spy(fn));
		withAsyncValidators(form, ...validators);

		for (let validator of validators) {
			expect(validator).toHaveBeenCalledTimes(1);
		}
	}));

	it('should not replace existing validators', fakeAsync(async () => {
		let initialValidator = () => null;
		let initialAsyncValidator = async () => null;
		let form = new FormControl(null, {
			validators: initialValidator,
			asyncValidators: initialAsyncValidator,
		});
		withAsyncValidators(form, async () => ({error: true}));

		expect(form.hasValidator(initialValidator)).toBe(true);
		expect(form.hasAsyncValidator(initialAsyncValidator)).toBe(true);
	}));
});

describe('composeAsyncValidators', () => {
	it('should work', fakeAsync(async () => {
		let form = withAsyncValidators(
			new FormControl<number>(1, {
				nonNullable: true,
			}),
			composeAsyncValidators([
				//
				async ({value}) => (value === 1 ? {error: {n: 1}} : null),
				async ({value}) => (value === 2 ? {error: {n: 2}} : null),
			]),
		);

		expect(form.pending).toBe(true);

		tick();

		expect(form.errors).toEqual({error: {n: 1}});

		form.setValue(2);

		expect(form.pending).toBe(true);

		tick();

		expect(form.errors).toEqual({error: {n: 2}});

		form.setValue(3);

		expect(form.pending).toBe(true);

		tick();

		expect(form.errors).toBeNull();
	}));

	it('should skip other validators after one fails', fakeAsync(async () => {
		let validators = [
			//
			async () => null,
			async () => ({error: true}),
			async () => null,
		].map((fn) => spy(fn));
		new FormControl(null, {
			asyncValidators: composeAsyncValidators(validators),
		});

		tick();

		expect(validators[0]).toHaveBeenCalledTimes(1);
		expect(validators[1]).toHaveBeenCalledTimes(1);
		expect(validators[2]).not.toHaveBeenCalled();
	}));

	it('should return same validator if only one provided', fakeAsync(async () => {
		let validator = async () => null;

		expect(composeAsyncValidators([validator])).toBe(validator);
	}));

	it('should return no-op validator if nothing provided', fakeAsync(async () => {
		expect(composeAsyncValidators([])).toBe(noopAsyncValidator);
	}));
});
