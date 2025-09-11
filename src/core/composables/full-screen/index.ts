// @ts-nocheck

import {DOCUMENT} from '@angular/common';
import {ElementRef, inject, WritableSignal} from '@angular/core';

import {MaybeElementSignal} from '../../basics/hntprbmf';

export function useFullScreen(
	// todo: type
	element: MaybeElementSignal,
	// todo: rename
	lndwpcai: WritableSignal<boolean>,
): void;

export function useFullScreen(lndwpcai) {
	// todo
	throw 'not implemented yet';
}

export namespace useFullScreen {
	// todo: rename? at, by, Host
	export function onCurrentElement(
		// todo: rename
		lndwpcai: WritableSignal<boolean>,
	): void;

	export function onCurrentElement(...args) {
		// todo
		return useFullScreen(inject(ElementRef, {optional: true}), ...args);
	}

	// todo: rename? at, by, Document/Root
	export function onDocument(
		//
		...args: Parameters<typeof useFullScreen.onCurrentElement>
	): void;

	export function onDocument(...args) {
		// todo
		return useFullScreen(inject(DOCUMENT, {optional: true})?.body, ...args);
	}
}
