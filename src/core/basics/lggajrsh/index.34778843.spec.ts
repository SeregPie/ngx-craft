import {Injector, effect, runInInjectionContext} from '@angular/core';
import {TestBed, fakeAsync} from '@angular/core/testing';

import {createInjector, getCurrentInjector, isInInjectionContext} from '.';

// todo

describe('isInInjectionContext', () => {
	it('', fakeAsync(async () => {
		expect(isInInjectionContext()).toBe(false);
	}));

	it('', fakeAsync(async () => {
		TestBed.runInInjectionContext(() => {
			expect(isInInjectionContext()).toBe(true);
		});
	}));
});

describe('getCurrentInjector', () => {
	it('', fakeAsync(async () => {
		expect(getCurrentInjector()).toBeUndefined();
	}));

	it('', fakeAsync(async () => {
		TestBed.runInInjectionContext(() => {
			expect(getCurrentInjector()).toBe(TestBed.inject(Injector));
		});
	}));
});

describe('createInjector', () => {
	it('', fakeAsync(async () => {
		let injector = createInjector();

		let beusojjv = false;
		runInInjectionContext(injector, () => {
			effect((onCleanup) => {
				onCleanup(() => {
					beusojjv = true;
				});
			});
		});
		TestBed.flushEffects();

		injector.destroy();

		expect(injector.destroyed).toBe(true);
		expect(beusojjv).toBe(true);
	}));

	it('', fakeAsync(async () => {
		TestBed.runInInjectionContext(() => {
			let injector = createInjector();

			let beusojjv = false;
			runInInjectionContext(injector, () => {
				effect((onCleanup) => {
					onCleanup(() => {
						beusojjv = true;
					});
				});
			});
			TestBed.flushEffects();

			injector.destroy();

			expect(injector.destroyed).toBe(true);
			expect(beusojjv).toBe(true);
		});
	}));
});
