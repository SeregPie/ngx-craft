import {WritableSignal} from '@angular/core';

import {MaybeSignal} from '../../basics/daowexhy';

export function useStorageItem(
	//
	name: MaybeSignal<string>,
): WritableSignal<undefined | string>;
