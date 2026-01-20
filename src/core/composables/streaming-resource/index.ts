// @ts-nocheck

import type {Signal, WritableSignal} from '@angular/core';

export function useStreamingResource<const T>(
  //
  fn: {(): Signal<Promise<T>>},
): Resource<T>;

export function useStreamingResource(fn) {
  // todo
}

export type Resource = Signal<Promise<T>> & {
  ready: Signal<boolean>;
  whenReady(): Promise<void>;
  state: Signal<State<T>>;
  pending: Signal<boolean>;
  data: Signal<undefined | T>;
  error: Signal<undefined | Error>;
  trigger(): void;
};

export type ResourceOptions = {
  disabled: WritableSignal<boolean>;
};

export type ResourceState<T> =
  | {
      status: 'idle';
    }
  | {
      status: 'pending';
    }
  | {
      status: 'ok';
      data: T;
    }
  | {
      status: 'error';
      error: Error;
    };
