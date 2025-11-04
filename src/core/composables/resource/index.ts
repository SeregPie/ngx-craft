// @ts-nocheck

import {isSignal, signal} from '@angular/core';
import type {Signal} from '@angular/core';

export function useResource<const T>(
  fn: {(): Promise<T>},
): useResource.Result<T>;

export namespace useResource {
  export type Result<T> = Signal<Promise<T>> & {
    ready: Signal<boolean>;
    whenReady(): Promise<void>;
    state: Signal<State<T>>;
    pending: Signal<boolean>;
    data: Signal<undefined | T>;
    error: Signal<unknown>;
    trigger(): void;
  };

  export type State<T> =
    | {
      status: 'pending';
    }
    | {
      status: 'ok';
      data: T;
    }
    | {
      status: 'error';
      error: unknown;
    };
}
