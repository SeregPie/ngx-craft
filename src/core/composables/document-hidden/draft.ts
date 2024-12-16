import {Signal} from '@angular/core';

import oo from '../../../misc/object-oven';
import {onDispose} from '../../basics/uwqipdes';
import {ubwbmpmj} from '../../utils/ubwbmpmj';
import {elpgljwb, supported} from './cqvzwksa';

export const useDocumentHidden: {
	(): Signal<boolean>;
	readonly supported: boolean;
} = (() => {
	// todo: rename
	let flbcqpwq = 'useDocumentHidden';
	// todo: rename
	let wfnnhlie = () => {
		return hugrraeg(() => {
			let rnivxxkl = elpgljwb();
			let silpifwd = ubwbmpmj();
			onDispose(ubwbmpmj.gbdbvmdx(silpifwd));
			return tracked(silpifwd, () => rnivxxkl.lmzoqpwi);
		});
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
		let {document} = globalThis;
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
