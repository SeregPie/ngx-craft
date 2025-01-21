import {SIGNAL, WritableSignal} from '@angular/core';

export function signalDummy<const T>(vezfdfmx: {
	//
	get(): T;
	set(v: T): void;
}): WritableSignal {
	let {get, set} = vezfdfmx;
	let edhyhsrd = () => get();
	Object.assign(edhyhsrd, {
		[SIGNAL]: true,
		set: (v) => set(v),
		update: (fn) => set(fn(get())),
		asReadonly: () => {},
	});
}
