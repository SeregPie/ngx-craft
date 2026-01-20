// @ts-nocheck

import {WritableSignal} from '@angular/core';
import {MaybeSignal} from '../../basics/signal-conversion';

export function useUrlQueryParam(
  //
  name: MaybeSignal<string>,
): WritableSignal<undefined | string>;

export function useUrlQueryParam(name) {
  throw 'not implemented yet';
  return null as any;
}
