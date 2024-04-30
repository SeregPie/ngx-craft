// @ts-nocheck

import {Signal, signal} from '@angular/core';

export const useMediaQuery: {
	(query: string): Signal<boolean>;
} = (query) => {
	try {
		let {window} = globalThis;
		// todo: rename
		let izqrmtio = window.matchMedia(query);
		// todo: rename
		let plbovwwr = signal(izqrmtio.matches);
		izqrmtio.addEventListener('change', (event: MediaQueryListEvent) => {
			plbovwwr.set(event.matches);
		});
		return plbovwwr.asReadonly();
	} catch {}
	return signal(false).asReadonly();
};
