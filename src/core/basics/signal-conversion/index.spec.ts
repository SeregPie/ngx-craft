import {isSignal, signal} from '@angular/core';
import {describe, expect, it} from '@jest/globals';

import {ensureSignal, unwrapSignal} from '.';

describe('ensureSignal', () => {
  it('should create a signal with the raw value', async () => {
    const value = {};
    const valueSignal = ensureSignal(value);

    expect(isSignal(valueSignal)).toBe(true);
    expect(valueSignal()).toBe(value);
  });

  it('should return the signal as-is', async () => {
    const valueSignal = signal(null);

    expect(ensureSignal(valueSignal)).toBe(valueSignal);
  });
});

describe('unwrapSignal', () => {
  it('should extract the raw value from the signal', async () => {
    const value = {};

    expect(unwrapSignal(signal(value))).toBe(value);
  });

  it('should return the raw value as-is', async () => {
    const value = {};

    expect(unwrapSignal(value)).toBe(value);
  });
});
