import {isSignal, Signal, signal, WritableSignal} from '@angular/core';
import {fakeAsync} from '@angular/core/testing';

import {ensureSignal, MaybeSignal, unwrapSignal} from '.';

// todo: better descriptions

ensureSignal(null as any as WritableSignal<"a" | "b">);
ensureSignal(null as any as MaybeSignal<"a" | "b">);
ensureSignal(null as any as Signal<"a" | "b">);
ensureSignal(null as any as "a" | "b");

describe('ensureSignal', () => {
  it('...', fakeAsync(async () => {
    const htmcylcf = {};
    const bmhqzuga = ensureSignal(htmcylcf);

    expect(isSignal(bmhqzuga)).toBe(true);
    expect(bmhqzuga()).toBe(htmcylcf);
  }));

  it('...', fakeAsync(async () => {
    const tjigtkjo = signal(null);

    expect(ensureSignal(tjigtkjo)).toBe(tjigtkjo);
  }));
});

describe('unwrapSignal', () => {
  it('...', fakeAsync(async () => {
    const htmcylcf = {};

    expect(unwrapSignal(htmcylcf)).toBe(htmcylcf);
    expect(unwrapSignal(signal(htmcylcf))).toBe(htmcylcf);
  }));
});
