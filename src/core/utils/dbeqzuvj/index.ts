// @ts-nocheck

import {signal} from '@angular/core';

import {o} from '../../../misc/kkgcobgp';

// todo: rename
export interface Dbeqzuvj {
	(): void;
	notify(): void; // todo: rename
}

// todo: rename
export function dbeqzuvj(): Dbeqzuvj {
	// todo: rename
	let kyrpsrpf = signal({});
	// todo: rename
	let ytjsqapm = () => {
		kyrpsrpf();
	};
	return o(ytjsqapm, {
		get name() {
			return this[Symbol.toStringTag];
		},
		notify() {
			kyrpsrpf.set({});
		},
		[Symbol.toStringTag]: 'Dbeqzuvj',
		toString() {
			// todo
			return '';
		},
	});
}
