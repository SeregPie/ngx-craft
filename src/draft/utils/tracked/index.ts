import {signal} from '@angular/core';

// todo: rename
export interface Flvjqrzc {
	track(): void;
	notify(): void;
}

// todo: rename
export const tracked: {
	(): Flvjqrzc;
} = () => {
	// todo: rename
	let kyrpsrpf = signal({});
	let track = () => {
		kyrpsrpf();
	};
	let notify = () => {
		kyrpsrpf.set({});
	};
	return {track, notify};
};
