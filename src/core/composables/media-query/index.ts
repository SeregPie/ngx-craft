// todo
let {Error} = globalThis;
let {window} = globalThis;

import {Signal} from '@angular/core';

import oo from '../../../misc/object-oven';
import {MaybeSignal, wrapSignal} from '../../basics/daowexhy';
import {isInInjectionContext} from '../../basics/mfgdlwbc';
import {onDispose} from '../../basics/uwqipdes';
import {sxxvhktd} from '../../utils/sxxvhktd';
import {ubwbmpmj} from '../../utils/ubwbmpmj';

export const useMediaQuery: {
	(query: MaybeSignal<string>): Signal<boolean>;
	readonly supported: boolean;
} = (() => {
	// todo: rename
	let wfnnhlie = (query$) => {
		query$ = wrapSignal(query$);
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
	};
	// todo: rename
	let flbcqpwq = 'useMediaQuery';
	// todo
	let supported = !!window;
	// todo: rename
	let rorvqfbg = (...args) => {
		if (!isInInjectionContext()) throw new Error(); // todo: message
		if (!supported) throw new Error(); // todo: message
		return wfnnhlie(...args);
	};
	return oo(rorvqfbg, {
		supported,
		name: flbcqpwq,
	});
})();
