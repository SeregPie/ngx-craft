import {InjectionToken} from '@angular/core';
import {faker} from '@faker-js/faker';
import {describe, expect, it} from '@jest/globals';
import {provide} from '.';

describe('provide', () => {
  class TestAa {
    static asValue = new this();
    static asFactory = () => new this();
    static asClass = this;
    static asExisting = new InjectionToken(this.name, {factory: this.asFactory});

    a = faker.number.int();
    b = faker.string.alphanumeric();
  }

  class TestBb {
    static asValue = new this();
    static asFactory = () => new this();
    static asClass = this;
    static asExisting = new InjectionToken(this.name, {factory: this.asFactory});

    a = faker.string.alphanumeric();
    b = faker.number.int();
  }

  describe('', () => {
    const testAaToken = new InjectionToken<TestAa>(TestAa.name);

    describe('useValue', () => {
      it('should create a correct provider', async () => {
        expect(provide(testAaToken).useValue(TestAa.asValue)).toEqual({
          provide: testAaToken,
          useValue: TestAa.asValue,
        });
      });

      it('should enforce type safety', async () => {
        expect(async () => {
          // @ts-expect-error
          provide(testAaToken).useValue(TestBb.asValue);
          // @ts-expect-error
          provide(testAaToken).useValue(TestAa.asFactory);
          // @ts-expect-error
          provide(testAaToken).useValue(TestAa.asClass);
          // @ts-expect-error
          provide(testAaToken).useValue(TestAa.asExisting);
        });
      });
    });

    describe('useFactory', () => {
      it('should create a correct provider', async () => {
        expect(provide(testAaToken).useFactory(TestAa.asFactory)).toEqual({
          provide: testAaToken,
          useFactory: TestAa.asFactory,
        });
      });

      it('should enforce type safety', async () => {
        expect(async () => {
          // @ts-expect-error
          provide(testAaToken).useFactory(TestAa.asValue);
          // @ts-expect-error
          provide(testAaToken).useFactory(TestBb.asFactory);
          // @ts-expect-error
          provide(testAaToken).useFactory(TestAa.asClass);
          // @ts-expect-error
          provide(testAaToken).useFactory(TestAa.asExisting);
        });
      });
    });

    describe('useClass', () => {
      it('should create a correct provider', async () => {
        expect(provide(testAaToken).useClass(TestAa.asClass)).toEqual({
          provide: testAaToken,
          useClass: TestAa.asClass,
        });
      });

      it('should enforce type safety', async () => {
        expect(async () => {
          // @ts-expect-error
          provide(testAaToken).useClass(TestAa.asValue);
          // @ts-expect-error
          provide(testAaToken).useClass(TestAa.asFactory);
          // @ts-expect-error
          provide(testAaToken).useClass(TestBb.asClass);
          // @ts-expect-error
          provide(testAaToken).useClass(TestAa.asExisting);
        });
      });
    });

    describe('useExisting', () => {
      it('should create a correct provider', async () => {
        expect(provide(testAaToken).useExisting(TestAa.asExisting)).toEqual({
          provide: testAaToken,
          useExisting: TestAa.asExisting,
        });
      });

      it('should enforce type safety', async () => {
        expect(async () => {
          // @ts-expect-error
          provide(testAaToken).useExisting(TestAa.asValue);
          // @ts-ignore
          provide(testAaToken).useExisting(TestAa.asFactory);
          // @ts-ignore
          provide(testAaToken).useExisting(TestAa.asClass);
          // @ts-ignore
          provide(testAaToken).useExisting(TestBb.asExisting);
        });
      });
    });
  });

  describe('multiple', () => {
    const testAaToken = new InjectionToken<Array<TestAa>>(TestAa.name);

    describe('useValue', () => {
      it('should create a correct provider', async () => {
        expect(provide(testAaToken, {multi: true}).useValue(TestAa.asValue)).toEqual({
          provide: testAaToken,
          multi: true,
          useValue: TestAa.asValue,
        });
      });

      it('should enforce type safety', async () => {
        expect(async () => {
          // @ts-expect-error
          provide(testAaToken, {multi: true}).useValue(TestBb.asValue);
          // @ts-expect-error
          provide(testAaToken, {multi: true}).useValue(TestAa.asFactory);
          // @ts-expect-error
          provide(testAaToken, {multi: true}).useValue(TestAa.asClass);
          // @ts-expect-error
          provide(testAaToken, {multi: true}).useValue(TestAa.asExisting);
        });
      });
    });

    describe('useFactory', () => {
      it('should create a correct provider', async () => {
        expect(provide(testAaToken, {multi: true}).useFactory(TestAa.asFactory)).toEqual({
          provide: testAaToken,
          multi: true,
          useFactory: TestAa.asFactory,
        });
      });

      it('should enforce type safety', async () => {
        expect(async () => {
          // @ts-expect-error
          provide(testAaToken, {multi: true}).useFactory(TestAa.asValue);
          // @ts-expect-error
          provide(testAaToken, {multi: true}).useFactory(TestBb.asFactory);
          // @ts-expect-error
          provide(testAaToken, {multi: true}).useFactory(TestAa.asClass);
          // @ts-expect-error
          provide(testAaToken, {multi: true}).useFactory(TestAa.asExisting);
        });
      });
    });

    describe('useClass', () => {
      it('should create a correct provider', async () => {
        expect(provide(testAaToken, {multi: true}).useClass(TestAa.asClass)).toEqual({
          provide: testAaToken,
          multi: true,
          useClass: TestAa.asClass,
        });
      });

      it('should enforce type safety', async () => {
        expect(async () => {
          // @ts-expect-error
          provide(testAaToken, {multi: true}).useClass(TestAa.asValue);
          // @ts-expect-error
          provide(testAaToken, {multi: true}).useClass(TestAa.asFactory);
          // @ts-expect-error
          provide(testAaToken, {multi: true}).useClass(TestBb.asClass);
          // @ts-expect-error
          provide(testAaToken, {multi: true}).useClass(TestAa.asExisting);
        });
      });
    });

    describe('useExisting', () => {
      it('should create a correct provider', async () => {
        expect(provide(testAaToken, {multi: true}).useExisting(TestAa.asExisting)).toEqual({
          provide: testAaToken,
          multi: true,
          useExisting: TestAa.asExisting,
        });
      });

      it('should enforce type safety', async () => {
        expect(async () => {
          // @ts-expect-error
          provide(testAaToken, {multi: true}).useExisting(TestAa.asValue);
          // @ts-ignore
          provide(testAaToken, {multi: true}).useExisting(TestAa.asFactory);
          // @ts-ignore
          provide(testAaToken, {multi: true}).useExisting(TestAa.asClass);
          // @ts-ignore
          provide(testAaToken, {multi: true}).useExisting(TestBb.asExisting);
        });
      });
    });
  });
});
