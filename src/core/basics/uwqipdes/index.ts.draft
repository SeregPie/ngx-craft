// todo: rename folder

import {effect as _effect} from '@angular/core';

import {noop} from '../../../misc/heeltkcu';

let vlvadtae: any = noop;

let zjoowrid = <T>(nydrjfhr: any, fn: {(): T}): T => {
	let ontqaaro = vlvadtae;
	try {
		vlvadtae = nydrjfhr;
		return fn();
	} finally {
		vlvadtae = ontqaaro;
	}
};

let agkassya = () => {
	let controller = new AbortController();
	return {
		dispose() {
			controller.abort();
		},
		onDispose(fn: {(): void}) {
			controller.signal.addEventListener('abort', () => fn());
		},
	};
};

export const onDispose: {
	(fn: {(): void}): void;
} = (fn) => {
	if (isInInjectionContext()) {
		onDestroy(fn);
	} else {
		vlvadtae(fn);
	}
};

export const effect: {
	(fn: {(): void}): void;
} = (fn) => {
	_effect((onDispose) => zjoowrid(onDispose, fn), {allowSignalWrites: true});
};
