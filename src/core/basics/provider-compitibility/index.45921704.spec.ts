import {InjectionToken} from '@angular/core';
import {fakeAsync} from '@angular/core/testing';
import {simpleFaker as faker} from '@faker-js/faker';

import {provide} from '.';

describe('provide', () => {
	class A {
		static asValue = new this();
		static asFactory = () => new this();
		static asClass = this;
		static asExisting = new InjectionToken('', {factory: this.asFactory});

		a = faker.number.int();
		b = faker.string.alphanumeric();
	}

	class B {
		static asValue = new this();
		static asFactory = () => new this();
		static asClass = this;
		static asExisting = new InjectionToken('', {factory: this.asFactory});

		a = faker.string.alphanumeric();
		b = faker.number.int();
	}

	describe('single', () => {
		let token = new InjectionToken<A>('');

		describe('useValue', () => {
			it('should create a correct provider', fakeAsync(async () => {
				expect(provide(token).useValue(A.asValue)).toEqual({
					provide: token,
					useValue: A.asValue,
				});
			}));

			it('should enforce type safety', fakeAsync(async () => {
				expect(async () => {
					// @ts-expect-error
					provide(token).useValue(B.asValue);
					// @ts-expect-error
					provide(token).useValue(A.asFactory);
					// @ts-expect-error
					provide(token).useValue(A.asClass);
					// @ts-expect-error
					provide(token).useValue(A.asExisting);
				});
			}));
		});

		describe('useFactory', () => {
			it('should create a correct provider', fakeAsync(async () => {
				expect(provide(token).useFactory(A.asFactory)).toEqual({
					provide: token,
					useFactory: A.asFactory,
				});
			}));

			it('should enforce type safety', fakeAsync(async () => {
				expect(async () => {
					// @ts-expect-error
					provide(token).useFactory(A.asValue);
					// @ts-expect-error
					provide(token).useFactory(B.asFactory);
					// @ts-expect-error
					provide(token).useFactory(A.asClass);
					// @ts-expect-error
					provide(token).useFactory(A.asExisting);
				});
			}));
		});

		describe('useClass', () => {
			it('should create a correct provider', fakeAsync(async () => {
				expect(provide(token).useClass(A.asClass)).toEqual({
					provide: token,
					useClass: A.asClass,
				});
			}));

			it('should enforce type safety', fakeAsync(async () => {
				expect(async () => {
					// @ts-expect-error
					provide(token).useClass(A.asValue);
					// @ts-expect-error
					provide(token).useClass(A.asFactory);
					// @ts-expect-error
					provide(token).useClass(B.asClass);
					// @ts-expect-error
					provide(token).useClass(A.asExisting);
				});
			}));
		});

		describe('useExisting', () => {
			it('should create a correct provider', fakeAsync(async () => {
				expect(provide(token).useExisting(A.asExisting)).toEqual({
					provide: token,
					useExisting: A.asExisting,
				});
			}));

			it('should enforce type safety', fakeAsync(async () => {
				expect(async () => {
					// @ts-expect-error
					provide(token).useExisting(A.asValue);
					// @ts-ignore
					provide(token).useExisting(A.asFactory);
					// @ts-ignore
					provide(token).useExisting(A.asClass);
					// @ts-ignore
					provide(token).useExisting(B.asExisting);
				});
			}));
		});
	});

	describe('multiple', () => {
		let token = new InjectionToken<Array<A>>('');

		describe('useValue', () => {
			it('should create a correct provider', fakeAsync(async () => {
				expect(provide(token, {multi: true}).useValue(A.asValue)).toEqual({
					provide: token,
					multi: true,
					useValue: A.asValue,
				});
			}));

			it('should enforce type safety', fakeAsync(async () => {
				expect(async () => {
					// @ts-expect-error
					provide(token, {multi: true}).useValue(B.asValue);
					// @ts-expect-error
					provide(token, {multi: true}).useValue(A.asFactory);
					// @ts-expect-error
					provide(token, {multi: true}).useValue(A.asClass);
					// @ts-expect-error
					provide(token, {multi: true}).useValue(A.asExisting);
				});
			}));
		});

		describe('useFactory', () => {
			it('should create a correct provider', fakeAsync(async () => {
				expect(provide(token, {multi: true}).useFactory(A.asFactory)).toEqual({
					provide: token,
					multi: true,
					useFactory: A.asFactory,
				});
			}));

			it('should enforce type safety', fakeAsync(async () => {
				expect(async () => {
					// @ts-expect-error
					provide(token, {multi: true}).useFactory(A.asValue);
					// @ts-expect-error
					provide(token, {multi: true}).useFactory(B.asFactory);
					// @ts-expect-error
					provide(token, {multi: true}).useFactory(A.asClass);
					// @ts-expect-error
					provide(token, {multi: true}).useFactory(A.asExisting);
				});
			}));
		});

		describe('useClass', () => {
			it('should create a correct provider', fakeAsync(async () => {
				expect(provide(token, {multi: true}).useClass(A.asClass)).toEqual({
					provide: token,
					multi: true,
					useClass: A.asClass,
				});
			}));

			it('should enforce type safety', fakeAsync(async () => {
				expect(async () => {
					// @ts-expect-error
					provide(token, {multi: true}).useClass(A.asValue);
					// @ts-expect-error
					provide(token, {multi: true}).useClass(A.asFactory);
					// @ts-expect-error
					provide(token, {multi: true}).useClass(B.asClass);
					// @ts-expect-error
					provide(token, {multi: true}).useClass(A.asExisting);
				});
			}));
		});

		describe('useExisting', () => {
			it('should create a correct provider', fakeAsync(async () => {
				expect(provide(token, {multi: true}).useExisting(A.asExisting)).toEqual({
					provide: token,
					multi: true,
					useExisting: A.asExisting,
				});
			}));

			it('should enforce type safety', fakeAsync(async () => {
				expect(async () => {
					// @ts-expect-error
					provide(token, {multi: true}).useExisting(A.asValue);
					// @ts-ignore
					provide(token, {multi: true}).useExisting(A.asFactory);
					// @ts-ignore
					provide(token, {multi: true}).useExisting(A.asClass);
					// @ts-ignore
					provide(token, {multi: true}).useExisting(B.asExisting);
				});
			}));
		});
	});
});
