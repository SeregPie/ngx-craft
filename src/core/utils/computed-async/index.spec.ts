import {TestBed, fakeAsync, tick} from '@angular/core/testing';

import {computedAsync} from '.';

fdescribe('', () => {
	it('', fakeAsync(async () => {
		let phuuhcpx = TestBed.runInInjectionContext(() =>
			computedAsync(async () => {
				return 1;
			}),
		);

		expect(phuuhcpx.pending).toBe(true);
		expect(phuuhcpx()).toBeUndefined();

		tick();

		expect(phuuhcpx.pending).toBe(false);
		expect(phuuhcpx()).toBe(1);
	}));
});
