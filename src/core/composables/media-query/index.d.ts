import {Signal} from '@angular/core';

import {MaybeSignal} from '../../basics/daowexhy';

export function useMediaQuery(
	//
	query: MaybeSignal<string>,
): Signal<boolean>;

export namespace useMediaQuery {
	export const supported: boolean;
}
