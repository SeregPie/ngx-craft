import {fakeAsync} from '@angular/core/testing';
import {FormControl} from '@angular/forms';

import {composeValidators, noopValidator, stubValidator, withValidators} from '.';

describe('withValidators', () => {
	it('should work in a common scenario', fakeAsync(async () => {
		const form = withValidators(
			new FormControl<number>(1, {
				nonNullable: true,
			}),
			({value}) => (value % 2 ? {error: true} : null),
		);

		expect(form.errors).toEqual({error: true});

		form.setValue(2);

		expect(form.errors).toBeNull();
	}));

	it('should contain all provided validators', fakeAsync(async () => {
		const form = new FormControl(null);
		const validators = Array.from({length: 3}, () => () => null);
		withValidators(form, ...validators);

		for (const validator of validators) {
			expect(form.hasValidator(validator)).toBe(true);
		}
	}));

	it('should call validators only once', fakeAsync(async () => {
		const form = new FormControl(null);
		const validators = Array.from({length: 3}, () => jest.fn(() => null));
		withValidators(form, ...validators);

		for (const validator of validators) {
			expect(validator).toHaveBeenCalledTimes(1);
		}
	}));

	it('should not replace existing validators', fakeAsync(async () => {
		const initialValidator = () => null;
		const initialAsyncValidator = async () => null;
		const form = new FormControl(null, {
			validators: initialValidator,
			asyncValidators: initialAsyncValidator,
		});
		withValidators(form, () => ({error: true}));

		expect(form.hasValidator(initialValidator)).toBe(true);
		expect(form.hasAsyncValidator(initialAsyncValidator)).toBe(true);
	}));
});

describe('composeValidators', () => {
	it('should work in a common scenario', fakeAsync(async () => {
		const form = withValidators(
			new FormControl<number>(1, {
				nonNullable: true,
			}),
			composeValidators([
				//
				({value}) => (value === 1 ? {error: {n: 1}} : null),
				({value}) => (value === 2 ? {error: {n: 2}} : null),
			]),
		);

		expect(form.errors).toEqual({error: {n: 1}});

		form.setValue(2);

		expect(form.errors).toEqual({error: {n: 2}});

		form.setValue(3);

		expect(form.errors).toBeNull();
	}));

	it('should skip remaining validators if one fails', fakeAsync(async () => {
		const validators = [null, {error: true}, null].map((v) => jest.fn(() => v));
		new FormControl(null, {
			validators: composeValidators(validators),
		});

		expect(validators[0]).toHaveBeenCalledTimes(1);
		expect(validators[1]).toHaveBeenCalledTimes(1);
		expect(validators[2]).not.toHaveBeenCalled();
	}));

	it('should return the same validator if only one provided', fakeAsync(async () => {
		const validator = () => null;

		expect(composeValidators([validator])).toBe(validator);
	}));

	it('should return a no-op validator if none provided', fakeAsync(async () => {
		expect(composeValidators([])).toBe(noopValidator);
	}));
});

describe('noopValidator', () => {
	it('should return null', fakeAsync(async () => {
		const form = withValidators(new FormControl(null), noopValidator);

		expect(form.errors).toBeNull();
	}));
});

describe('stubValidator', () => {
	it('should return provided errors', fakeAsync(async () => {
		const form = withValidators(new FormControl(null), stubValidator({error: true}));

		expect(form.errors).toEqual({error: true});
	}));
});
