import {WritableSignal} from '@angular/core';

import {MaybeSignal} from '../../basics/daowexhy';

export function useUrlQueryParam(
	//
	name: MaybeSignal<string>,
): WritableSignal<undefined | string>;
