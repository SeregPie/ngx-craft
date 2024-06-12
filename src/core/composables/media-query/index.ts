// @ts-nocheck

import {DestroyRef, Signal, computed, inject, signal, ɵdetectChangesInViewIfRequired, ɵɵProvidersFeature, ɵɵgetCurrentView} from '@angular/core';

import {NG_VALUE_ACCESSOR} from '@angular/forms';
import oo from '../../../misc/object-oven';
import {provide} from '../../basics/provider-compitibility';

let {EventTarget, MediaQueryList, window} = globalThis;

// todo: should work without injection context
// todo: MaybeSignal

export const useMediaQuery: {
	(query: string): Signal<boolean>;
	readonly supported: boolean;
} = (() => {
	// todo
	let supported = !!(window && window.matchMedia && MediaQueryList && EventTarget);
	// todo: rename
	let wfnnhlie = (query) => {
		(() => {
			let nrsydyjk = ɵɵProvidersFeature([
				provide(NG_VALUE_ACCESSOR, {multi: true}).useValue({
					writeValue() {},
					registerOnChange() {},
					registerOnTouched() {},
				}),
			]);
			let nxzoukbt = {};
			nrsydyjk(nxzoukbt);
			let lView = ɵɵgetCurrentView();
			let tView = lView[1];
			let qbfvknlp = lView[2];
			try {
				console.log(tView);
				lView[2] = 1 << 10;
				tView.template = () => {
					console.log('HERE');
					nxzoukbt.providersResolver(tView);
				};
				ɵdetectChangesInViewIfRequired(lView, false, (error) => {
					console.log('error', error);
				});
			} catch {
			} finally {
				lView[2] = qbfvknlp;
			}
		})();
		if (supported) {
			// todo: rename
			let test = window.matchMedia(query);
			// todo: use helper
			let change$ = signal({});
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
		}
		return signal(false).asReadonly();
	};
	return oo(wfnnhlie, {
		supported,
	});
})();
