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
} = () => {
	// todo: rename
	let kyrpsrpf = signal({});
	// todo
	return Object.defineProperties(
		() => {
			kyrpsrpf();
		},
		{
			notify: {
				configurable: true,
				value: () => {
					kyrpsrpf.set({});
				},
			},
		},
	);
};
