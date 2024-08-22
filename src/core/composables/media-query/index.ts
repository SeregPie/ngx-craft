import {computed, effect, signal, Signal} from '@angular/core';

import oo from '../../../misc/object-oven';
import {MaybeSignal, wrapSignal} from '../../basics/daowexhy';
import {onDispose} from '../../basics/uwqipdes';
import {sxxvhktd} from '../../utils/sxxvhktd';
import {ubwbmpmj} from '../../utils/ubwbmpmj';

export const useMediaQuery: {
	(query: MaybeSignal<string>): Signal<boolean>;
	readonly supported: boolean;
} = (() => {
	// todo: rename
	let flbcqpwq = 'useMediaQuery';
	// todo
	let supported = true;
	// todo: rename
	let wfnnhlie = (query$) => {
		query$ = wrapSignal(query$);
		if (supported) {
			return sxxvhktd(() => {
				let query = query$();
				// todo: rename
				let rnivxxkl = window.matchMedia(query);
				let {notify, tracked} = ubwbmpmj();
				((target, event, listener) => {
					target.addEventListener(event, listener);
					onDispose(() => {
						target.removeEventListener(event, listener);
					});
				})(rnivxxkl, 'change', notify);
				return tracked(() => rnivxxkl.matches);
			});
		}
		return signal(false).asReadonly();
	};
	return oo(wfnnhlie, {
		supported,
		name: flbcqpwq,
	});
})();

export const useMediaQuery2: {
	(query: MaybeSignal<string>): Signal<boolean>;
	readonly supported: boolean;
} = (() => {
	// todo: rename
	let flbcqpwq = 'useMediaQuery';
	// todo
	let supported = true;
	// todo: rename
	let wfnnhlie = (query$) => {
		query$ = wrapSignal(query$);
		let dfbhauyn$ = computed(() => window.matchMedia(query$()));
		let {notify, tracked} = ubwbmpmj();
		effect((onDispose) => {
			((target, event, listener) => {
				target.addEventListener(event, listener);
				onDispose(() => {
					target.removeEventListener(event, listener);
				});
			})(dfbhauyn$(), 'change', notify);
		});
		return tracked(() => dfbhauyn$().matches);
	};
	return oo(wfnnhlie, {
		supported,
		name: flbcqpwq,
	});
})();
