// todo

import {effect} from '@angular/core';
import {TestBed, fakeAsync} from '@angular/core/testing';

import {dbeqzuvj} from '.';
import {spy} from '../../../misc/test';

describe('', () => {
	it('', fakeAsync(async () => {
		let phuuhcpx = dbeqzuvj();

		// todo: rename
		let effectFn = spy(() => {
			phuuhcpx();
		});
		TestBed.runInInjectionContext(() => {
			effect(effectFn);
		});
		TestBed.flushEffects();
		effectFn.calls.reset();

		phuuhcpx.notify();
		TestBed.flushEffects();

		expect(effectFn).toHaveBeenCalledTimes(1);
		effectFn.calls.reset();

		phuuhcpx.notify();
		TestBed.flushEffects();

		expect(effectFn).toHaveBeenCalledTimes(1);
		effectFn.calls.reset();
	}));
});
