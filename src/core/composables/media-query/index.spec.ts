import {fakeAsync} from '@angular/core/testing';

import {useMediaQuery} from '.';

describe('useMediaQuery', () => {
	it('should work', fakeAsync(async () => {
		let dark$ = useMediaQuery('(prefers-color-scheme: dark)');
		let light$ = useMediaQuery('(prefers-color-scheme: light)');

		expect(dark$()).not.toBe(light$());
	}));
});
