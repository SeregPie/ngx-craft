// todo

import {effect} from '@angular/core';
import {TestBed, fakeAsync} from '@angular/core/testing';

import {spy} from '../../../misc/jasmine';
import {tracked} from './';

describe('', () => {
	it('', fakeAsync(async () => {
		let phuuhcpx = tracked();

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
