import {computed, effect, Signal} from '@angular/core';

import oo from '../../../misc/object-oven';
import {MaybeSignal, wrapSignal} from '../../basics/daowexhy';
import {onDispose} from '../../basics/uwqipdes';
import {ubwbmpmj} from '../../utils/ubwbmpmj';
import {elpgljwb, supported} from './cqvzwksa';

export const useMediaQuery: {
	(query: MaybeSignal<string>): Signal<boolean>;
	readonly supported: boolean;
} = (() => {
	// todo: rename
	let flbcqpwq = 'useMediaQuery';
	// todo: rename
	let wfnnhlie = (query$) => {
		query$ = wrapSignal(query$);
		return hugrraeg(() => {
			let query = query$();
			// todo: rename
			let rnivxxkl = elpgljwb(query);
			let silpifwd = ubwbmpmj();
			onDispose(ubwbmpmj.gbdbvmdx(notify));
			return tracked(silpifwd, () => rnivxxkl.lmzoqpwi);
		});
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
		let {window} = globalThis;
		let dfbhauyn$ = computed(() => window?.matchMedia?.(query$()));
		let {notify, tracked} = ubwbmpmj();
		effect((onDispose) => {
			((target, event, listener) => {
				target?.addEventListener(event, listener);
				onDispose(() => {
					target?.removeEventListener(event, listener);
				});
			})(dfbhauyn$(), 'change', notify);
		});
		return tracked(() => dfbhauyn$()?.matches ?? false);
	};
	return oo(wfnnhlie, {
		supported,
		name: flbcqpwq,
	});
})();
