import {isSignal, signal} from '@angular/core';
import type {Signal, WritableSignal} from '@angular/core';
import {describe, expect, expectTypeOf, it} from 'vitest';
import {ensureSignal, unwrapSignal} from '.';
import type {MaybeSignal} from '.';

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
    ((input: MaybeSignal<'a' | 'b'>) => {
      expectTypeOf(ensureSignal(input)).toEqualTypeOf<Signal<'a' | 'b'>>();
    });
    ((input: 'a' | 'b') => {
      expectTypeOf(ensureSignal(input)).toEqualTypeOf<Signal<'a' | 'b'>>();
    });
    ((input: Signal<'a' | 'b'>) => {
      expectTypeOf(ensureSignal(input)).toEqualTypeOf<Signal<'a' | 'b'>>();
    });
    ((input: 'a' | 'b' | Signal<'a' | 'b'>) => {
      expectTypeOf(ensureSignal(input)).toEqualTypeOf<Signal<'a' | 'b'>>();
    });
    ((input: Signal<'a' | 'b'> | WritableSignal<'a' | 'b'>) => {
      expectTypeOf(ensureSignal(input)).toEqualTypeOf<Signal<'a' | 'b'> | WritableSignal<'a' | 'b'>>();
    });
    ((input: 'a' | 'b' | Signal<Signal<'a' | 'b'>>) => {
      expectTypeOf(ensureSignal(input)).toEqualTypeOf<Signal<'a' | 'b'> | Signal<Signal<'a' | 'b'>>>();
    });
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
    ((input: MaybeSignal<'a' | 'b'>) => {
      expectTypeOf(unwrapSignal(input)).toEqualTypeOf<'a' | 'b'>();
    });
    ((input: 'a' | 'b') => {
      expectTypeOf(unwrapSignal(input)).toEqualTypeOf<'a' | 'b'>();
    });
    ((input: Signal<'a' | 'b'>) => {
      expectTypeOf(unwrapSignal(input)).toEqualTypeOf<'a' | 'b'>();
    });
    ((input: 'a' | 'b' | Signal<'a' | 'b'>) => {
      expectTypeOf(unwrapSignal(input)).toEqualTypeOf<'a' | 'b'>();
    });
    ((input: Signal<'a' | 'b'> | WritableSignal<'a' | 'b'>) => {
      expectTypeOf(unwrapSignal(input)).toEqualTypeOf<'a' | 'b'>();
    });
    ((input: 'a' | 'b' | Signal<Signal<'a' | 'b'>>) => {
      expectTypeOf(unwrapSignal(input)).toEqualTypeOf<'a' | 'b' | Signal<'a' | 'b'>>();
    });
  });
});
