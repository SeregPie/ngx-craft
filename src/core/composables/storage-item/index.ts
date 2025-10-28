import {WritableSignal} from '@angular/core';
import {MaybeSignal} from '../../basics/signal-conversion';

export function useStorageItem(
  name: MaybeSignal<string>,
  options?: useStorageItem.Options,
): WritableSignal<undefined | string>;

export function useStorageItem(name, {
  session = false,
} = {}) {
  throw 'not implemented yet';
  return null as any;
}

export namespace useStorageItem {
  export type Options = Partial<{
    session: MaybeSignal<boolean>;
  }>;
}
