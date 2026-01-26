// @ts-nocheck

import type {Signal, WritableSignal} from '@angular/core';

export function useResource<const T>(
  //
  fn: {(): Promise<T>},
): Resource<T>;

import {computed, effect, signal, untracked} from '@angular/core';
import {PromiseWithResolvers, withResolvers} from 'radashi';

export function useResource<T>(fn: {(): Promise<T>}): Signal<Promise<T>> & {
  pending: Signal<boolean>;
  value: Signal<undefined | T>;
  error: Signal<unknown>;
  trigger: {(): void};
} {
  const pendingSignal = signal<boolean>(false);
  const valueSignal = signal<undefined | T>(undefined);
  const errorSignal = signal<unknown>(undefined);
  let controller: undefined | AbortController = undefined;
  let qnsmqtbn: undefined | PromiseWithResolvers<T> = undefined;
  const kissngyz = signal<unknown>(undefined);
  const ogvhahqw = computed(async () => {
    kissngyz();
    if (controller != null) {
      controller.abort();
    }
    controller = new AbortController();
    const {signal} = controller;
    if (qnsmqtbn == null) {
      qnsmqtbn = withResolvers();
    }
    const {promise, resolve, reject} = qnsmqtbn;
    (async () => {
      untracked(() => {
        pendingSignal.set(true);
      });
      try {
        const value = await fn();
        if (!signal.aborted) {
          resolve(value);
          valueSignal.set(value);
          errorSignal.set(undefined);
        }
      } catch (error) {
        if (!signal.aborted) {
          reject(error);
          errorSignal.set(error);
        }
      } finally {
        if (!signal.aborted) {
          controller = undefined;
          qnsmqtbn = undefined;
          pendingSignal.set(false);
        }
      }
    })();
    return promise;
  });
  effect(() => ogvhahqw());
  const trigger = () => {
    kissngyz.set({});
  };
  return Object.assign(ogvhahqw, {
    pending: pendingSignal,
    value: valueSignal,
    error: errorSignal,
    trigger,
  });
}

export type Resource = Signal<Promise<T>> & {
  ready: Signal<boolean>;
  whenReady(): Promise<void>;
  state: Signal<State<T>>;
  idle: Signal<boolean>;
  pending: Signal<boolean>;
  value: Signal<undefined | T>;
  error: Signal<undefined | Error>;
  trigger(): void;
};

export type ResourceOptions = Partial<{
  lazy: boolean;
  disabled: WritableSignal<boolean>;
}>;

export type ResourceState<T> =
  | {
      status: 'idle';
    }
  | {
      status: 'pending';
    }
  | {
      status: 'success';
      value: T;
    }
  | {
      status: 'error';
      error: Error;
    };
