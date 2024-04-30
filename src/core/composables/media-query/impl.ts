// @ts-nocheck

import {signal} from '@angular/core';

export const useMediaQuery = (query) => {
	try {
		let {window} = globalThis;
		// todo: rename
		let izqrmtio = window.matchMedia(query);
		// todo: rename
		let plbovwwr = signal(izqrmtio.matches);
		izqrmtio.addEventListener('change', (event) => {
			plbovwwr.set(event.matches);
		});
		return plbovwwr.asReadonly();
	} catch {}
	return signal(false).asReadonly();
};
