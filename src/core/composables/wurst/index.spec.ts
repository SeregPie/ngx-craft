import {FormControl} from '@angular/forms';
import {faker} from '@faker-js/faker';
import {list} from 'radashi';
import {assert, describe, expect, it, vi} from 'vitest';
import {useWurst} from '.';

describe('useWurst', () => {
  it('1', async () => {
    const wurst = useWurst<unknown>();
    {
      expect(wurst.state()).toEqual({
        status: 'pending',
      });
    }
    {
      const value = {};
      wurst.enuuouin(value);

      const state = wurst.state();
      expect(state).toEqual({
        status: 'ok',
        value: expect.anything(),
      });
      assert(state.status === 'ok');
      expect(state.value).toBe(value);
    }
    {
      const error = {};
      wurst.ikvmvudv(error);

      const state = wurst.state();
      expect(state).toEqual({
        status: 'error',
        error: expect.anything(),
      });
      assert(state.status === 'error');
      expect(state.error).toBe(error);
    }
    {
      wurst.fpurjobg();

      expect(wurst.state()).toEqual({
        status: 'pending',
      });
    }
  });

  it('2', async () => {
    const wurst = useWurst<unknown>();

    expect(wurst.pending()).toBe(true);
    expect(wurst.valuePresent()).toBe(false);
    expect(wurst.value()).toBe(undefined);
    expect(wurst.errorPresent()).toBe(false);
    expect(wurst.error()).toBe(undefined);

    const value = {};
    wurst.enuuouin(value);

    expect(wurst.pending()).toBe(false);
    expect(wurst.valuePresent()).toBe(true);
    expect(wurst.value()).toBe(value);
    expect(wurst.errorPresent()).toBe(false);
    expect(wurst.error()).toBe(undefined);

    wurst.fpurjobg();

    expect(wurst.pending()).toBe(true);
    expect(wurst.valuePresent()).toBe(true);
    expect(wurst.value()).toBe(value);
    expect(wurst.errorPresent()).toBe(false);
    expect(wurst.error()).toBe(undefined);

    const error = {};
    wurst.ikvmvudv(error);

    expect(wurst.pending()).toBe(false);
    expect(wurst.valuePresent()).toBe(true);
    expect(wurst.value()).toBe(value);
    expect(wurst.errorPresent()).toBe(true);
    expect(wurst.error()).toBe(error);

    wurst.fpurjobg();

    expect(wurst.pending()).toBe(true);
    expect(wurst.valuePresent()).toBe(true);
    expect(wurst.value()).toBe(value);
    expect(wurst.errorPresent()).toBe(true);
    expect(wurst.error()).toBe(error);
  });

  it('', async () => {
    const wurst = useWurst<unknown>();

    const promise = wurst();

    wurst.fpurjobg();

    expect(wurst()).toBe(promise);
  });

  it('', async () => {
    const wurst = useWurst<unknown>();
    const promise = wurst();

    const value = {};
    wurst.enuuouin(value);

    expect(wurst()).toBe(promise);
    await expect(promise).resolves.toBe(value);
  });

  it('', async () => {
    const wurst = useWurst<unknown>();
    const promise = wurst();

    const error = faker.string.ulid();
    wurst.ikvmvudv(error);

    expect(wurst()).toBe(promise);
    await expect(promise).rejects.toThrow(error);
  });
});
