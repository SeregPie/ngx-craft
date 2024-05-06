import {DestroyRef, Injector} from '@angular/core';
import {fakeAsync} from '@angular/core/testing';

// todo: better tests

describe.skip('useMediaQuery', () => {
	it('should work in a common scenario', fakeAsync(async () => {
		let injector = Injector.create({providers: []});
		let destroyRef = injector.get(DestroyRef, undefined, {optional: true});
		console.log(destroyRef);
	}));
});
