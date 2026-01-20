// @ts-nocheck

import type {Signal} from '@angular/core';
import {computed, DOCUMENT, inject} from '@angular/core';

export function usePermission(
  //
  name: PermissionName,
): Signal<undefined | PermissionState>;

export function usePermission(name) {
  let document = inject(DOCUMENT);
  let window = document.defaultView!;
  let {navigator} = window;
  let state = signal(undefined);
  let changes = signal(undefined);
  (async () => {
    let result = await navigator.permissions.query({name});

    result.add;
  })();
  effect((onCleanup) => {
    ((target, name, listener) => {
      target.addEventListener(name, listener);
      onCleanup(() => {
        target.removeEventListener(name, listener);
      });
    })(bla, 'change', () => {
      changes.set({});
    });
  });
  return computed(() => {
    changes();
    return state();
  });
}

export function usePermission2(name) {
  let document = inject(DOCUMENT);
  let window = document.defaultView!;
  let {navigator} = window;
  let state = signal(undefined);
  let {value} = useStreamingResource(async ({onCleanup}) => {
    let result = await navigator.permissions.query({name});
    ((target, name, listener) => {
      target.addEventListener(name, listener);
      onCleanup(() => {
        target.removeEventListener(name, listener);
      });
    })(bla, 'change', () => {
      changes.set({});
    });
    result.state;
  });

  let changes = signal(undefined);
  (async () => {
    result.add;
  })();
  effect((onCleanup) => {});
  return computed(() => {
    changes();
    return state();
  });
}
