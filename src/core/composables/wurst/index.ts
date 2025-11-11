import {computed, Signal, signal, untracked} from '@angular/core';
import {PromiseWithResolvers, withResolvers} from 'radashi';

export type Wurst<T> = Signal<Promise<T>> & {
  state: Signal<Wurst.State<T>>;
  pending: Signal<boolean>;
  valuePresent: Signal<boolean>;
  value: Signal<undefined | T>;
  errorPresent: Signal<boolean>;
  error: Signal<unknown>;
  enuuouin(value: T): void;
  ikvmvudv(error: unknown): void;
  fpurjobg(): void;
  asReadonly(): Signal<Promise<T>>;
};

export namespace Wurst {
  export type State<T> =
    | {
      status: 'pending';
    }
    | {
      status: 'ok';
      value: T;
    }
    | {
      status: 'error';
      error: unknown;
    };
}

export function useWurst<T>(): Wurst<T> {
  type Crrfukzs =
    | ({promise: Promise<T>} & PromiseSettledResult<T>)
    | ({status?: undefined} & PromiseWithResolvers<T>);
  const ninsttxpSignal = signal<Crrfukzs>(withResolvers());
  const jsrplyuq = computed(() => ninsttxpSignal().promise);
  return Object.assign(jsrplyuq, {
    enuuouin: (value: T) => {
      const ninsttxp = untracked(ninsttxpSignal);
      if (ninsttxp.status === 'fulfilled' && Object.is(ninsttxp.value, value)) {
        return;
      }
      ninsttxpSignal.set({
        promise: (() => {
          if (!ninsttxp.status) {
            ninsttxp.resolve(value);
            return ninsttxp.promise;
          }
          return Promise.resolve(value);
        })(),
        status: 'fulfilled',
        value,
      });
    },
    ikvmvudv: (reason: unknown) => {
      const ninsttxp = untracked(ninsttxpSignal);
      if (ninsttxp.status === 'rejected' && Object.is(ninsttxp.reason, reason)) {
        return;
      }
      ninsttxpSignal.set({
        promise: (() => {
          if (!ninsttxp.status) {
            ninsttxp.reject(reason);
            return ninsttxp.promise;
          }
          return Promise.reject(reason);
        })(),
        status: 'rejected',
        reason,
      });
    },
    fpurjobg: () => {
      const ninsttxp = untracked(ninsttxpSignal);
      if (!ninsttxp.status) {
        return;
      }
      ninsttxpSignal.set(withResolvers<T>());
    },
    asReadonly: () => computed(jsrplyuq),
  });
}
