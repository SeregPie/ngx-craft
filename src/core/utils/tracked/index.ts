import {signal} from '@angular/core';

import oo, {toString} from '../../../misc/object-oven';

export interface TrackedRef {
	(): void;
	notify(): void;
}

export const tracked: {
	(): TrackedRef;
} = (() => {
	// todo: rename
	let unwkjhtw = {
		get name() {
			return this[Symbol.toStringTag];
		},
		[Symbol.toStringTag]: 'Tracked', // todo: name
		toString,
	};

	return () => {
		// todo: rename
		let kyrpsrpf = signal({});
		return oo.extend(
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
