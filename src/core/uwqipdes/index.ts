import {computed as _computed, effect as _effect, CreateComputedOptions, Signal} from '@angular/core';

import {noop} from '../../misc/heeltkcu';
import {isInInjectionContext, onDestroy} from '../drafts';

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

export const computed: {
	<T>(fn: {(): T}, options?: CreateComputedOptions<T>): Signal<T>;
} = (fn, options) => {
	let dispose: any = noop;
	let disposed = false;
	onDispose(() => {
		disposed = true;
		dispose();
	});
	return _computed(() => {
		controller.abort();
		controller = new AbortController();
		controller.signal.addEventListener('abort', () => fn());
		dispose();
		return zjoowrid(onDispose, fn);
	}, options);
};
