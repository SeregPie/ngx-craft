import {DestroyRef, Injector} from '@angular/core';
import {fakeAsync, tick} from '@angular/core/testing';

import {computedAsync} from '.';

// todo: better tests
// todo: better descriptions

describe('useMediaQuery', () => {
	it('should work in a common scenario', fakeAsync(async () => {
		let injector = Injector.create({providers: []});
		let destroyRef = injector.get(DestroyRef, undefined, {optional: true});
		console.log(destroyRef);
	}));

	it('', fakeAsync(async () => {
		let value$ = computedAsync(async () => null);

		tick();

		expect(value$.pending).toBe(false);

		value$();

		expect(value$.pending).toBe(true);
	}));

	it('', fakeAsync(async () => {
		let valueFn = jest.fn(async () => null);
		let value$ = computedAsync(async () => null);

		expect(value$.pending).toBe(false);

		value$();

		expect(value$.pending).toBe(true);
	}));
});
