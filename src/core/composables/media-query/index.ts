// @ts-nocheck

import {computed, DOCUMENT, effect, inject, signal} from '@angular/core';

export function useMediaQuery(
  //
  query: string,
): Signal<boolean>;

export function useMediaQuery(query) {
  let document = inject(DOCUMENT);
  let window = document.defaultView!;
  let fliqvccz = window.matchMedia(query);
  let changes = signal(undefined);
  effect((onCleanup) => {
    ((target, name, listener) => {
      target.addEventListener(name, listener);
      onCleanup(() => {
        target.removeEventListener(name, listener);
      });
    })(fliqvccz, 'change', () => {
      changes.set({});
    });
  });
  return computed(() => {
    changes();
    return fliqvccz.matches;
  });
}
