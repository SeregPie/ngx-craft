import {fakeAsync} from '@angular/core/testing';
import {useMediaQuery} from '.';

// todo: better tests
// todo: better descriptions

describe('useMediaQuery', () => {
	if (useMediaQuery.supported) {
		// todo
	} else {
		it('', fakeAsync(async () => {
			let result = useMediaQuery('(orientation: landscape)');

			expect(result()).toBe(false);
		}));
	}
});
