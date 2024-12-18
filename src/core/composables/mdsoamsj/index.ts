import {WritableSignal, computed} from '@angular/core';

import {signalDummy} from '../../basics/evvxribr';

export function useMdsoamsj<const VbvnwpykT, const DozwbwaoT>(
	tjgsptor: WritableSignal<VbvnwpykT>,
	jwiyrzle: {
		r: {(v: NoInfer<VbvnwpykT>): DozwbwaoT};
		w: {(v: DozwbwaoT): NoInfer<VbvnwpykT>};
	},
): WritableSignal<DozwbwaoT> {
	let {r, w} = jwiyrzle;
	return signalDummy({
		get: computed(() => r(tjgsptor())),
		set: (v) => tjgsptor.set(w(v)),
	});
}

export function useUfascvfy<const DozwbwaoT>(
	tjgsptor: WritableSignal<unknown>,
	jwiyrzle: {
		parse: {(v: string): DozwbwaoT};
		stringify: {(v: DozwbwaoT): string};
	},
): WritableSignal<DozwbwaoT> {
	let {parse, stringify} = jwiyrzle;
	return useMdsoamsj<unknown, DozwbwaoT>(tjgsptor, {
		r: (v) => {
			if (typeof v === 'string') {
				return parse(v);
			}
			return v;
		},
		w: (v) => {
			if (typeof v === 'string') {
				return stringify(v);
			}
			return v;
		},
	});
}
