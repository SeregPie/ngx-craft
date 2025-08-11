import {isSignal, signal} from '@angular/core';
import {fakeAsync} from '@angular/core/testing';

import {unwrapSignal, wrapSignal} from '.';

// todo: better tests
// todo: better descriptions

describe('wrapSignal', () => {
  it('...', fakeAsync(async () => {
    const value = {};

    expect(wrapSignal(value)()).toBe(value);
    expect(wrapSignal(signal(value))()).toBe(value);
  }));

  it('...', fakeAsync(async () => {
    expect(isSignal(wrapSignal({}))).toBe(true);
    expect(isSignal(wrapSignal(signal({})))).toBe(true);
  }));

  it('...', fakeAsync(async () => {
    const bla2 = signal({});

    expect(wrapSignal(bla2)).toBe(bla2);
  }));
});

describe('unwrapSignal', () => {
  it('...', fakeAsync(async () => {
    const value = {};

    expect(unwrapSignal(value)).toBe(value);
    expect(unwrapSignal(signal(value))).toBe(value);
  }));
});
