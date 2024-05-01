// @ts-nocheck

import {signal} from '@angular/core';

// todo: rename
export interface Dbeqzuvj {
	(): void;
	notify(): void; // todo: rename
}

// todo: rename
export const dbeqzuvj: {
	(): Dbeqzuvj;
} = (() => {
	// todo: rename
	let unwkjhtw = {
		get name() {
			return this[Symbol.toStringTag];
		},
		[Symbol.toStringTag]: 'Dbeqzuvj',
		toString() {
			// todo
			return '';
		},
	};

	return () => {
		// todo: rename
		let kyrpsrpf = signal({});
		// todo
		return ((target, ...sources) => {
			sources.forEach((source) => {
				Reflect.ownKeys(source).forEach((key) => {
					let descriptor = Reflect.getOwnPropertyDescriptor(source, key);
					delete descriptor.enumerable;
					delete descriptor.writable;
					Reflect.defineProperty(target, key, descriptor);
				});
			});
			return target;
		})(
			() => {
				kyrpsrpf();
			},
			{
				notify() {
					kyrpsrpf.set({});
				},
			},
			unwkjhtw,
		);
	};
})();
