import {isSignal, signal} from '@angular/core';
import {fakeAsync} from '@angular/core/testing';

import {unwrapSignal, wrapSignal} from '.';

// todo: better tests
// todo: better descriptions

describe('wrapSignal', () => {
  it('...', fakeAsync(async () => {
    expect(isSignal(wrapSignal({}))).toBe(true);
    expect(isSignal(wrapSignal(signal({})))).toBe(true);
  }));

  it('...', fakeAsync(async () => {
    const value = {};

    expect(wrapSignal(value)()).toBe(value);
    expect(wrapSignal(signal(value))()).toBe(value);
  }));

  it('...', fakeAsync(async () => {
    const value = {};
    const bla2 = wrapSignal(signal(value));

    expect(isSignal(bla2)).toBe(true);
    expect(bla2()).toBe(value);
  }));

  it('...', fakeAsync(async () => {
    const bla = signal({});

    expect(wrapSignal(bla)).toBe(bla);
  }));
});

describe('unwrapSignal', () => {
  it('...', fakeAsync(async () => {
    const value = {};
    const bla2 = unwrapSignal(signal(value));

    expect(unwrapSignal(value)).toBe(value);
    expect(unwrapSignal(signal(value))).toBe(value);
  }));

  it('...', fakeAsync(async () => {
    const bla = signal({});

    expect(wrapSignal(bla)).toBe(bla);
  }));

  it('...', fakeAsync(async () => {
    expect(isSignal(unwrapSignal({}))).toBe(false);
    expect(isSignal(unwrapSignal(signal({})))).toBe(false);
  }));

  it('...', fakeAsync(async () => {
    const value = {};

    expect(unwrapSignal(value)).toBe(value);
    expect(unwrapSignal(signal(value))).toBe(value);
  }));
});
