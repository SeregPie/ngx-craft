import {signal} from '@angular/core';
import {fakeAsync} from '@angular/core/testing';

import {useMediaQuery} from '.';

// todo: better tests

describe.skip('useMediaQuery', () => {
	it('should work in a common scenario', fakeAsync(async () => {
		let query$ = signal<string>('(min-width: 2560px)');
		let matches$ = useMediaQuery(query$);

		expect(matches$).toBe(window.matchMedia(query$()).matches);

		query$.set('(max-width: 2560px)');

		expect(matches$).toBe(window.matchMedia(query$()).matches);
	}));
});
