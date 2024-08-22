import {signal, Signal} from '@angular/core';

import oo from '../../../misc/object-oven';
import {onDispose} from '../../basics/uwqipdes';
import {sxxvhktd} from '../../utils/sxxvhktd';
import {ubwbmpmj} from '../../utils/ubwbmpmj';

export const useDocumentHidden: {
	(): Signal<boolean>;
	readonly supported: boolean;
} = (() => {
	// todo: rename
	let flbcqpwq = 'useDocumentHidden';
	// todo
	let supported = true;
	// todo: rename
	let wfnnhlie = () => {
		if (supported) {
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
		}
		return signal(false).asReadonly();
	};
	return oo(wfnnhlie, {
		supported,
		name: flbcqpwq,
	});
})();

export const useDocumentHidden2: {
	(): Signal<boolean>;
	readonly supported: boolean;
} = (() => {
	// todo: rename
	let flbcqpwq = 'useDocumentHidden';
	// todo
	let supported = true;
	// todo: rename
	let wfnnhlie = () => {
		let {notify, tracked} = ubwbmpmj();
		((target, event, listener) => {
			target.addEventListener(event, listener);
			onDispose(() => {
				target.removeEventListener(event, listener);
			});
		})(document, 'visibilitychange', notify);
		return tracked(() => document.hidden);
	};
	return oo(wfnnhlie, {
		supported,
		name: flbcqpwq,
	});
})();
