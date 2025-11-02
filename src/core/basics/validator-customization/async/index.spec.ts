import {FormControl} from '@angular/forms';
import {faker} from '@faker-js/faker';
import {list, sleep} from 'radashi';
import {describe, expect, it, vi} from 'vitest';
import {composeAsyncValidators, noopAsyncValidator, stubAsyncValidator, withAsyncValidators} from '.';

describe('withAsyncValidators', () => {
  it('should work in a common scenario', async () => {
    // todo: rename
    const enfdttrd = {error: true};
    const form = withAsyncValidators(
      new FormControl<number>(0, {
        nonNullable: true,
      }),
      async ({value}) => value % 2 ? enfdttrd : null,
    );

    expect(form.status).toBe('PENDING');

    await sleep(0);

    expect(form.status).toBe('VALID');

    form.setValue(1);

    expect(form.status).toBe('PENDING');

    await sleep(0);

    expect(form.status).toBe('INVALID');
    expect(form.errors).toEqual(enfdttrd);

    form.setValue(2);

    expect(form.status).toBe('PENDING');

    await sleep(0);

    expect(form.status).toBe('VALID');
  });

  it('should contain all provided validators', async () => {
    const form = new FormControl(null);
    const validators = list(3).map(() => async () => null);
    withAsyncValidators(form, ...validators);

    for (const validator of validators) {
      expect(form.hasAsyncValidator(validator)).toBe(true);
    }
  });

  // todo: better description
  it('should call validators only once', async () => {
    const form = new FormControl(null);
    const validators = list(3).map(() => vi.fn(async () => null));
    withAsyncValidators(form, ...validators);

    for (const validator of validators) {
      expect(validator).toHaveBeenCalledTimes(1);
    }
  });

  it('should not replace existing validators', async () => {
    const initialValidator = () => null;
    const initialAsyncValidator = async () => null;
    const form = new FormControl(null, {
      validators: initialValidator,
      asyncValidators: initialAsyncValidator,
    });
    withAsyncValidators(form, async () => ({error: true}));

    expect(form.hasValidator(initialValidator)).toBe(true);
    expect(form.hasAsyncValidator(initialAsyncValidator)).toBe(true);
  });
});

describe('composeAsyncValidators', () => {
  it('should work in a common scenario', async () => {
    // todo
    const form = withAsyncValidators(
      new FormControl<number>(1, {
        nonNullable: true,
      }),
      composeAsyncValidators([
        async ({value}) => value <= 1 ? {error: {n: 1}} : null,
        async ({value}) => value <= 2 ? {error: {n: 2}} : null,
      ]),
    );

    expect(form.status).toBe('PENDING');

    await sleep(0);

    expect(form.status).toBe('INVALID');
    expect(form.errors).toEqual({error: {n: 1}});

    form.setValue(2);

    expect(form.status).toBe('PENDING');

    await sleep(0);

    expect(form.status).toBe('INVALID');
    expect(form.errors).toEqual({error: {n: 2}});

    form.setValue(3);

    expect(form.status).toBe('PENDING');

    await sleep(0);

    expect(form.status).toBe('VALID');
  });

  // todo: description
  it('should skip remaining validators if one fails', async () => {
    // todo: rename
    const jesergzs = list(2).map(() => vi.fn(async () => null));
    const fyddlfln = list(2).map(() => vi.fn(async () => null));
    const wwmzeika = [...fyddlfln, vi.fn(async () => ({error: true}))];
    new FormControl(null, {
      asyncValidators: composeAsyncValidators([...wwmzeika, ...jesergzs]),
    });

    await sleep(0);

    for (const validator of wwmzeika) {
      expect(validator).toHaveBeenCalledTimes(1);
    }
    for (const validator of jesergzs) {
      expect(validator).not.toHaveBeenCalled();
    }
  });

  it('should return the same validator if only one provided', async () => {
    const validator = async () => null;

    expect(composeAsyncValidators([validator])).toBe(validator);
  });

  it('should return a no-op validator if none provided', async () => {
    expect(composeAsyncValidators([])).toBe(noopAsyncValidator);
  });
});

describe('noopAsyncValidator', () => {
  it('should return null', async () => {
    const form = withAsyncValidators(new FormControl(null), noopAsyncValidator);

    await sleep(0);

    expect(form.status).toBe('VALID');
  });
});

describe('stubAsyncValidator', () => {
  it('should return provided errors', async () => {
    const errors = {
      a: faker.string.ulid(),
      b: faker.string.ulid(),
    };
    const form = withAsyncValidators(new FormControl(null), stubAsyncValidator(errors));

    await sleep(0);

    expect(form.status).toBe('INVALID');
    expect(form.errors).toEqual(errors);
  });
});
