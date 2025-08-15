import {isSignal, signal} from '@angular/core';
import {describe, expect, it} from '@jest/globals';

import {ensureSignal, unwrapSignal} from '.';

// todo: better descriptions

describe('wrapSignal', () => {
  it('...', async () => {
    const value = {};
    const value$ = ensureSignal(value);

    expect(isSignal(value$)).toBe(true);
    expect(value$()).toBe(value);
  });

  it('...', async () => {
    const value$ = signal(null);

    expect(ensureSignal(value$)).toBe(value$);
  });
});

describe('unwrapSignal', () => {
  it('...', async () => {
    const value = {};

    expect(unwrapSignal(value)).toBe(value);
    expect(unwrapSignal(signal(value))).toBe(value);
  });
});
