import {Signal, computed, signal} from '@angular/core';

import oo from '../../../misc/object-oven';
import {ubwbmpmj} from '../../drafts';

// todo: should work without injection context
// todo: single instance

export const useDocumentHidden: {
	(): Signal<boolean>;
	readonly supported: boolean;
} = (() => {
	let supported$ = computed(() => {
		return true;
	});
	// todo: rename
	let wfnnhlie = () => {
		if (supported$()) {
			let {computed, notify} = ubwbmpmj();
			document.addEventListener('visibilitychange', notify, {signal: sakluuho()});
			return computed(() => document.hidden);
		}
		return signal(false).asReadonly();
	};
	return oo(wfnnhlie, {
		get supported() {
			return supported$();
		},
	});
})();
