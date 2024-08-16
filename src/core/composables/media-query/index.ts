// @ts-nocheck

import {DestroyRef, Signal, computed, effect, inject, signal} from '@angular/core';

import oo from '../../../misc/object-oven';

let {EventTarget, MediaQueryList, window} = globalThis;

// todo: should work without injection context
// todo: MaybeSignal

export type MaybeSignal<T> = T | Signal<T>;

export const resolveSignal: {
	<T>(v: MaybeSignal<T>): Signal<T>;
} = (v) => (isSignal(v) ? v : signal(v).asReadonly());

let vlvadtae = () => {};

const onDispose = (fn) => vlvadtae(fn);

const effect2 = (fn, options) => {
	return effect((onDispose) => {
		let ontqaaro = vlvadtae;
		try {
			vlvadtae = onDispose;
			return fn();
		} finally {
			vlvadtae = ontqaaro;
		}
	}, options);
};

const dsperahj = (target: EventTarget, event, listener) => {
	// todo: check if needed
	if (target instanceof EventTarget) {
		target.addEventListener(event, listener);
		onDispose(() => {
			target.removeEventListener(event, listener);
		});
	} else if (target instanceof MediaQueryList) {
		target.addListener(event, listener);
		onDispose(() => {
			target.removeListener(event, listener);
		});
	}
};

const ppghjywt = () => {
	let wjjabukv = signal({});
	let omiqvfeb = () => wjjabukv.set({});
	let epbncxnm = (fn) => {
		return computed(() => {
			wjjabukv();
			return fn();
		});
	};
	return {omiqvfeb, epbncxnm};
};

const computed2 = (fn, options) => {
	let dispose = () => {};
	onDispose(dispose);
	return computed(() => {
		dispose();
		return fn();
	});
};

const sxxvhktd = (fn, options) => {
	let ukbysuzp = computed2(fn);
	return computed2(() => ukbysuzp()());
};

export const useMediaQuery2: {
	(query: MaybeSignal<string>): Signal<boolean>;
	readonly supported: boolean;
} = (() => {
	let supported = !!(window && window.matchMedia && MediaQueryList && EventTarget);
	let wfnnhlie = (query) => {
		if (supported) {
			let query$ = resolveSignal(query);
			return sxxvhktd(() => {
				let rnivxxkl = window.matchMedia(query);
				let {omiqvfeb, epbncxnm} = ppghjywt();
				dsperahj(rnivxxkl, 'change', omiqvfeb);
				return epbncxnm(() => rnivxxkl.matches);
			});
		}
		return signal(false).asReadonly();
	};
	return oo(wfnnhlie, {
		supported,
	});
})();

export const useMediaQuery: {
	(query: string): Signal<boolean>;
	readonly supported: boolean;
} = (() => {
	// todo
	let supported = !!(window && window.matchMedia && MediaQueryList && EventTarget);
	// todo: rename
	let wfnnhlie = (query) => {
		if (supported) {
			let query$ = resolveSignal(query);
			let snxhzkfh$ = computed(() => {
				let query = query$();
				// todo: rename
				let test = window.matchMedia(query);
				// todo: use helper
				let change$ = signal({});
				let omiqvfeb = () => change$.set({});
				let epbncxnm = (fn) => {
					return computed(() => {
						change$();
						return fn();
					});
				};
				// todo: use helper
				((target, event, listener) => {
					// todo: check if needed
					if (target instanceof EventTarget) {
						target.addEventListener(event, listener);
						inject(DestroyRef).onDestroy(() => {
							target.removeEventListener(event, listener);
						});
					} else {
						target.addListener(event, listener);
						inject(DestroyRef).onDestroy(() => {
							target.removeListener(event, listener);
						});
					}
				})(test, 'change', () => change$.set({}));
				return computed(() => {
					change$();
					return test.matches;
				});
			});
		}
		return signal(false).asReadonly();
	};
	return oo(wfnnhlie, {
		supported,
	});
})();
