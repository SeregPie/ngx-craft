import {isSignal, signal} from '@angular/core';
import type {Signal} from '@angular/core';
import {describe, expect, expectTypeOf, it} from 'vitest';
import {ensureSignal, unwrapSignal} from '.';
import type {MaybeSignal} from '.';

ensureSignal(null as any as Signal<'a' | 'b'>);
ensureSignal(null as any as 'a' | 'b');
ensureSignal(null as any as Signal<'a' | 'b'> | 'a' | 'b');
ensureSignal(null as any as Signal<Signal<'a' | 'b'>> | Signal<'a' | 'b'>);
ensureSignal(null as any as MaybeSignal<'a' | 'b'>);

describe('ensureSignal', () => {
  it('should wrap the raw value into a signal', async () => {
    const value = {};
    const valueSignal = ensureSignal(value);

    expect(isSignal(valueSignal)).toBe(true);
    expect(valueSignal()).toBe(value);
  });

  it('should return the signal as is', async () => {
    const valueSignal = signal(null);

    expect(ensureSignal(valueSignal)).toBe(valueSignal);
  });

  it('...', async () => {
    ((v: 'a' | 'b') => {
      expectTypeOf(ensureSignal(v)).toEqualTypeOf<Signal<'a' | 'b'>>();
    });
    ((v: Signal<'a'> | Signal<'b'>) => {
      expectTypeOf(ensureSignal(v)).toEqualTypeOf<Signal<'a' | 'b'>>();
    });
    ((v: Signal<'a' | 'b'>) => {
      expectTypeOf(ensureSignal(v)).toEqualTypeOf<Signal<'a' | 'b'>>();
    });
    ((v: 'a' | 'b' | Signal<'a' | 'b'>) => {
      expectTypeOf(ensureSignal(v)).toEqualTypeOf<Signal<'a' | 'b'>>();
    });
    ((v: 'a' | 'b' | Signal<Signal<'a' | 'b'>>) => {
      expectTypeOf(ensureSignal(v)).toEqualTypeOf<Signal<'a' | 'b'> | Signal<Signal<'a' | 'b'>>>();
    });
    expectTypeOf(ensureSignal({} as any as Signal<'a' | 'b'>)).toEqualTypeOf<Signal<'a' | 'b'>>();

    expectTypeOf(ensureSignal({} as any as 'a' | 'b' | Signal<'a' | 'b'>)).toEqualTypeOf<Signal<'a' | 'b'>>();
  });
});

describe('unwrapSignal', () => {
  it('should unwrap the raw value from the signal', async () => {
    const value = {};

    expect(unwrapSignal(signal(value))).toBe(value);
  });

  it('should return the raw value as is', async () => {
    const value = {};

    expect(unwrapSignal(value)).toBe(value);
  });

  it('...', async () => {
    ((v: 'a' | 'b') => {
      expectTypeOf(unwrapSignal(v)).toEqualTypeOf<'a' | 'b'>();
    });
    ((v: Signal<'a' | 'b'>) => {
      expectTypeOf(unwrapSignal(v)).toEqualTypeOf<'a' | 'b'>();
    });
    ((v: Signal<'a'> | Signal<'b'>) => {
      expectTypeOf(unwrapSignal(v)).toEqualTypeOf<'a' | 'b'>();
    });
    ((v: 'a' | 'b' | Signal<'a'> | Signal<'b'> | Signal<'a' | 'b'>) => {
      expectTypeOf(unwrapSignal(v)).toEqualTypeOf<'a' | 'b'>();
    });
    ((v: 'a' | 'b' | Signal<Signal<'a' | 'b'>>) => {
      expectTypeOf(unwrapSignal(v)).toEqualTypeOf<'a' | 'b' | Signal<'a' | 'b'>>();
    });
    ((v: 'a' | 'b' | Signal<Signal<'a' | 'b'>>) => {
      expectTypeOf(unwrapSignal(v)).toEqualTypeOf<'a' | 'b' | Signal<'a' | 'b'>>();
    });
  });
});
