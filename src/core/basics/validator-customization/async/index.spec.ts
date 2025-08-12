import {FormControl} from '@angular/forms';
import {describe, expect, it, jest} from "@jest/globals";
import {list, sleep} from 'radashi';

import {composeAsyncValidators, noopAsyncValidator, stubAsyncValidator, withAsyncValidators} from '.';

describe('withAsyncValidators', () => {
  it('should work in a common scenario', async () => {
    // todo
    const form = withAsyncValidators(
      new FormControl<number>(1, {
        nonNullable: true,
      }),
      async ({value}) => value % 2 ? {error: true} : null,
    );

    expect(form.pending).toBe(true);

    await sleep(0);

    expect(form.errors).toEqual({error: true});

    form.setValue(2);

    expect(form.pending).toBe(true);

    await sleep(0);

    expect(form.errors).toBeNull();
  });

  it('should contain all provided validators', async () => {
    const form = new FormControl(null);
    const validators = list(4).map(() => async () => null);
    withAsyncValidators(form, ...validators);

    for (const validator of validators) {
      expect(form.hasAsyncValidator(validator)).toBe(true);
    }
  });

  // todo: better description
  it('should call validators only once', async () => {
    const form = new FormControl(null);
    const validators = list(4).map(() => jest.fn(async () => null));
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
        async ({value}) => value === 1 ? {error: {n: 1}} : null,
        async ({value}) => value === 2 ? {error: {n: 2}} : null,
      ]),
    );

    expect(form.pending).toBe(true);

    await sleep(0);

    expect(form.errors).toEqual({error: {n: 1}});

    form.setValue(2);

    expect(form.pending).toBe(true);

    await sleep(0);

    expect(form.errors).toEqual({error: {n: 2}});

    form.setValue(3);

    expect(form.pending).toBe(true);

    await sleep(0);

    expect(form.errors).toBeNull();
  });

  // todo: description
  it('should skip remaining validators if one fails', async () => {
    // todo: rename
    const jesergzs = list(4).map(() => jest.fn(async () => null));
    const fyddlfln = list(4).map(() => jest.fn(async () => null));
    const wwmzeika = [...fyddlfln, jest.fn(async () => ({error: true}))];
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

    expect(form.errors).toBeNull();
  });
});

describe('stubAsyncValidator', () => {
  it('should return provided errors', async () => {
    const errors = {error: true};
    const form = withAsyncValidators(new FormControl(null), stubAsyncValidator(errors));

    await sleep(0);

    expect(form.errors).toEqual(errors);
  });
});
