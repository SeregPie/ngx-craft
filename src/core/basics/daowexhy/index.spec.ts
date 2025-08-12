import {isSignal, signal} from '@angular/core';
import {describe, expect, it} from "@jest/globals";

import {unwrapSignal, wrapSignal} from '.';

// todo: better descriptions

describe('wrapSignal', () => {
  it('...', async () => {
    const htmcylcf = {};
    const bmhqzuga = wrapSignal(htmcylcf);

    expect(isSignal(bmhqzuga)).toBe(true);
    expect(bmhqzuga()).toBe(htmcylcf);
  });

  it('...', async () => {
    const tjigtkjo = signal(null);

    expect(wrapSignal(tjigtkjo)).toBe(tjigtkjo);
  });
});

describe('unwrapSignal', () => {
  it('...', async () => {
    const htmcylcf = {};

    expect(unwrapSignal(htmcylcf)).toBe(htmcylcf);
    expect(unwrapSignal(signal(htmcylcf))).toBe(htmcylcf);
  });
});
