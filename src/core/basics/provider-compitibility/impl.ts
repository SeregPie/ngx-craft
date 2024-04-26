// @ts-nocheck

import {o} from '../../../misc/kkgcobgp';

// todo: rename ghqocucw

// todo: rename
let buvqlfgx = (token, {
	multi = false,
} = {}) => {
	// todo: rename
	let nbvwhjys = {
		provide: token,
		...(multi ? {multi} : {}),
	};
	return o({}, ...[
		...[
			'useValue',
			'useFactory',
			'useClass',
			'useExisting',
		].map((key) => ({
			[key](ghqocucw) {
				return {...nbvwhjys, [key]: ghqocucw};
			},
		})),
		{
			[Symbol.toStringTag]: 'ProviderChoice',
		},
	]);
};

export default o(buvqlfgx, {
	name: 'provide',
}) as any;
