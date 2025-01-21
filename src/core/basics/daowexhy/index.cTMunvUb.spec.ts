import {signal} from '@angular/core';
import {fakeAsync} from '@angular/core/testing';

import {unwrapSignal, wrapSignal} from '.';

// todo: better tests
// todo: better descriptions

describe('wrapSignal', () => {
	it('...', fakeAsync(async () => {
		const value = {};

		expect(wrapSignal(value)()).toBe(value);
		expect(wrapSignal(signal(value))()).toBe(value);
	}));
});

describe('unwrapSignal', () => {
	it('...', fakeAsync(async () => {
		const value = {};

		expect(unwrapSignal(value)).toBe(value);
		expect(unwrapSignal(signal(value))).toBe(value);
	}));
});
