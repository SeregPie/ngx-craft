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
	// todo: type
	return Object.assign(() => {
		kyrpsrpf()
	}, {
		notify: () => {
			kyrpsrpf.set({})
		}
	});
};
