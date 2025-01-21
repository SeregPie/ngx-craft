// @ts-nocheck

import {WritableSignal, signal} from '@angular/core';

import {MaybeSignal, wrapSignal} from '../../basics/daowexhy';

export function useUrlQueryParam(
	//
	name: MaybeSignal<string>,
): WritableSignal<undefined | string>;

export function useUrlQueryParam(name) {
	let $name = wrapSignal(name);
	// todo
	return signal(undefined);
}
