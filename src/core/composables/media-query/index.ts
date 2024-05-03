// @ts-nocheck

import {Signal, signal} from '@angular/core';

export const useMediaQuery: {
	(query: string): Signal<boolean>;
} = (query) => {
	let queryResult = window.matchMedia(query);
	let queryMatches$ = signal(queryResult.matches);
	queryResult.addEventListener('change', (event: MediaQueryListEvent) => {
		queryMatches$.set(event.matches);
	});
	return queryMatches$.asReadonly();
};
