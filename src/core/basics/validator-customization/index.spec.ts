import {FormControl} from "@angular/forms";
import {simpleFaker as faker} from "@faker-js/faker";
import {describe, expect, it, jest} from "@jest/globals";
import {list} from "radashi";

import {composeValidators, noopValidator, stubValidator, withValidators} from ".";

describe("withValidators", () => {
  it("should work in a common scenario", async () => {
    // todo: rename
    const enfdttrd = {error: true};
    const form = withValidators(
      new FormControl<number>(1, {
        nonNullable: true,
      }),
      ({value}) => value % 2 ? enfdttrd : null,
    );

    expect(form.status).toBe("INVALID");
    expect(form.errors).toEqual(enfdttrd);

    form.setValue(2);

    expect(form.status).toBe("VALID");
  });

  it("should contain all provided validators", async () => {
    const form = new FormControl(null);
    const validators = list(3).map(() => () => null);
    withValidators(form, ...validators);

    for (const validator of validators) {
      expect(form.hasValidator(validator)).toBe(true);
    }
  });

  // todo: better description
  it("should call validators only once", async () => {
    const form = new FormControl(null);
    const validators = list(3).map(() => jest.fn(() => null));
    withValidators(form, ...validators);

    for (const validator of validators) {
      expect(validator).toHaveBeenCalledTimes(1);
    }
  });

  it("should not replace existing validators", async () => {
    const initialValidator = () => null;
    const initialAsyncValidator = async () => null;
    const form = new FormControl(null, {
      validators: initialValidator,
      asyncValidators: initialAsyncValidator,
    });
    withValidators(form, () => ({error: true}));

    expect(form.hasValidator(initialValidator)).toBe(true);
    expect(form.hasAsyncValidator(initialAsyncValidator)).toBe(true);
  });
});

describe("composeValidators", () => {
  it("should work in a common scenario", async () => {
    // todo
    const form = withValidators(
      new FormControl<number>(1, {
        nonNullable: true,
      }),
      composeValidators([
        ({value}) => value <= 1 ? {error: {n: 1}} : null,
        ({value}) => value <= 2 ? {error: {n: 2}} : null,
      ]),
    );

    expect(form.status).toBe("INVALID");
    expect(form.errors).toEqual({error: {n: 1}});

    form.setValue(2);

    expect(form.status).toBe("INVALID");
    expect(form.errors).toEqual({error: {n: 2}});

    form.setValue(3);

    expect(form.status).toBe("VALID");
  });

  // todo: description
  it("should skip remaining validators if one fails", async () => {
    // todo: rename
    const jesergzs = list(2).map(() => jest.fn(() => null));
    const fyddlfln = list(2).map(() => jest.fn(() => null));
    const wwmzeika = [...fyddlfln, jest.fn(() => ({error: true}))];
    new FormControl(null, {
      validators: composeValidators([...wwmzeika, ...jesergzs]),
    });

    for (const validator of wwmzeika) {
      expect(validator).toHaveBeenCalledTimes(1);
    }
    for (const validator of jesergzs) {
      expect(validator).not.toHaveBeenCalled();
    }
  });

  it("should return the same validator if only one provided", async () => {
    const validator = () => null;

    expect(composeValidators([validator])).toBe(validator);
  });

  it("should return a no-op validator if none provided", async () => {
    expect(composeValidators([])).toBe(noopValidator);
  });
});

describe("noopValidator", () => {
  it("should return null", async () => {
    const form = withValidators(new FormControl(null), noopValidator);

    expect(form.status).toBe("VALID");
  });
});

describe("stubValidator", () => {
  it("should return provided errors", async () => {
    const errors = {error: faker.string.ulid()};
    const form = withValidators(new FormControl(null), stubValidator(errors));

    expect(form.status).toBe("INVALID");
    expect(form.errors).toEqual(errors);
  });
});
