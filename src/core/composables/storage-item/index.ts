// @ts-nocheck

import {WritableSignal, signal} from '@angular/core';

import {MaybeSignal, wrapSignal} from '../../basics/daowexhy';

export function useStorageItem(
	//
	name: MaybeSignal<string>,
	options?: useStorageItem.Options,
): WritableSignal<undefined | string>;

export function useStorageItem(name, {session = false} = {}) {
	let $name = wrapSignal(name);
	let $session = wrapSignal(session);
	// todo
	return signal(undefined);
}

export namespace useStorageItem {
	export type Options = Partial<{
		session: MaybeSignal<boolean>;
	}>;
}
