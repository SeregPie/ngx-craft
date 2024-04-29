// @ts-nocheck

import o from '../../../misc/kkgcobgp';

// todo: rename?
let main = (token, {multi = false} = {}) => {
	let provider = {provide: token, ...(multi ? {multi} : {})};
	return o.new(
		...['useValue', 'useFactory', 'useClass', 'useExisting'].map((key) => ({
			[key](source) {
				return {...provider, [key]: source};
			},
		})),
		{
			[Symbol.toStringTag]: 'ProviderChoice',
		},
	);
};

export default o(main, {
	name: 'provide',
}) as any;