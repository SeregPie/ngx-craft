import {InjectionToken} from '@angular/core';
import {fakeAsync} from '@angular/core/testing';

import {provide} from '.';

describe('provide', () => {
	describe('', () => {
		interface Xchsasel {
			a: number;
			b: string;
		}

		// todo: rename
		// todo: set values
		class Appsgzuf implements Xchsasel {
			a = 123;
			b = 'abc';
		}

		describe('', () => {
			let token = new InjectionToken<Xchsasel>('');

			it('', () => {
				let source = new Appsgzuf();
				let provider = provide(token).useValue(source);

				expect(provider).toEqual({
					provide: token,
					useValue: source,
				});
			});
		});
	});

	// todo: description
	it('...', fakeAsync(async () => {
		// todo: rename
		interface Xchsasel {
			a: number;
			b: string;
		}

		// todo: rename
		// todo: set values
		class Appsgzuf implements Xchsasel {
			a = 123;
			b = 'abc';
		}

		{
			let token = new InjectionToken<Xchsasel>('');
			{
				let source = new Appsgzuf();
				let provider = provide(token).useValue(source);

				expect(provider).toEqual({
					provide: token,
					useValue: source,
				});
			}
			{
				let source = () => new Appsgzuf();
				let provider = provide(token).useFactory(source);

				expect(provider).toEqual({
					provide: token,
					useFactory: source,
				});
			}
			{
				let source = Appsgzuf;
				let provider = provide(token).useClass(source);

				expect(provider).toEqual({
					provide: token,
					useClass: source,
				});
			}
			{
				let source = new InjectionToken<Appsgzuf>('');
				let provider = provide(token).useExisting(source);

				expect(provider).toEqual({
					provide: token,
					useExisting: source,
				});
			}
		}
		{
			let token = new InjectionToken<Array<Xchsasel>>('');
			{
				let source = new Appsgzuf();
				let provider = provide(token, {multi: true}).useValue(source);

				expect(provider).toEqual({
					provide: token,
					multi: true,
					useValue: source,
				});
			}
			{
				let source = () => new Appsgzuf();
				let provider = provide(token, {multi: true}).useFactory(source);

				expect(provider).toEqual({
					provide: token,
					multi: true,
					useFactory: source,
				});
			}
			{
				let source = Appsgzuf;
				let provider = provide(token, {multi: true}).useClass(source);

				expect(provider).toEqual({
					provide: token,
					multi: true,
					useClass: source,
				});
			}
			{
				let source = new InjectionToken<Appsgzuf>('');
				let provider = provide(token, {multi: true}).useExisting(source);

				expect(provider).toEqual({
					provide: token,
					multi: true,
					useExisting: source,
				});
			}
		}
	}));

	// todo: description
	it('...', fakeAsync(async () => {
		let token = new InjectionToken<number>('');

		expect(async () => {
			// @ts-expect-error
			provide(token).useValue([1]);

			// @ts-expect-error
			provide(token, {multi: false}).useValue([1]);

			// @ts-ignore
			provide(token, {multi: true}).useValue(1);

			// @ts-ignore
			provide(token, {multi: true}).useValue([1]);
		});

		expect().nothing();
	}));

	// todo: description
	it('...', fakeAsync(async () => {
		let token = new InjectionToken<Array<number>>('');

		expect(async () => {
			// @ts-expect-error
			provide(token).useValue(1);

			// @ts-expect-error
			provide(token, {multi: false}).useValue(1);

			// @ts-expect-error
			provide(token, {multi: true}).useValue([1]);
		});

		expect().nothing();
	}));
});
