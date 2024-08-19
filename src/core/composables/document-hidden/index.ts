// todo
let {Error} = globalThis;
let {document} = globalThis;

import {Signal} from '@angular/core';

import oo from '../../../misc/object-oven';
import {isInInjectionContext} from '../../basics/mfgdlwbc';
import {onDispose} from '../../basics/uwqipdes';
import {sxxvhktd} from '../../utils/sxxvhktd';
import {ubwbmpmj} from '../../utils/ubwbmpmj';

export const useDocumentHidden: {
	(): Signal<boolean>;
	readonly supported: boolean;
} = (() => {
	// todo: rename
	let wfnnhlie = () => {
		return sxxvhktd(() => {
			let {notify, tracked} = ubwbmpmj();
			((target, event, listener) => {
				target.addEventListener(event, listener);
				onDispose(() => {
					target.removeEventListener(event, listener);
				});
			})(document, 'visibilitychange', notify);
			return tracked(() => document.hidden);
		});
	};
	// todo: rename
	let flbcqpwq = 'useDocumentHidden';
	// todo
	let supported = !!document;
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
