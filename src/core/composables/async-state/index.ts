// @ts-nocheck

import {computed, Signal, signal} from '@angular/core';

export type AsyncDataStatus = 'idle' | 'pending' | 'resolved' | 'rejected';

export type AsyncDataOptions = Partial<{
  lazy: boolean;
}>;

export type AsyncData<T> = {
  (): Promise<T>;
  value: Signal<undefined | T>;
  error: Signal<unknown>;
  status: Signal<AsyncDataStatus>;
  resolved: Signal<boolean>;
  rejected: Signal<boolean>;
  loading: Signal<boolean>;
  ready: Signal<boolean>;
  whenReady(): Promise<void>;
  refresh(): void;
};

export function useAsyncData<const T>(fn: {(): Promise<T>}, options?: AsyncDataOptions): AsyncData<T>;

export function useAsyncData(fn) {
  let errorSignal = signal(undefined);
  let statusSignal = signal('idle');
  let abortController;
  let resultSignal = computed(async () => {
    try {
      statusSignal.set('loading');

      statusSignal.set('success');
    } catch (error) {
      statusSignal.set('error');
      errorSignal.set(error);
    } finally {
    }
  });
}
