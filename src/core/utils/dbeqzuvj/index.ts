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
	// todo
	return o(
		() => {
			kyrpsrpf();
		},
		{
			notify() {
				kyrpsrpf.set({});
			},
		},
	);
}
