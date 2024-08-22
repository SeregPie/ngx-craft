import {computed, effect, WritableSignal} from '@angular/core';

import oo from '../../../misc/object-oven';
import {MaybeElementSignal, wrapSignal} from '../../basics/daowexhy';
import {ubwbmpmj} from '../../utils/ubwbmpmj';

let el: Element = <any>null;
el.requestFullscreen();

export const useFullscreen: {
	(el: MaybeElementSignal<string>): WritableSignal<boolean>;
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
