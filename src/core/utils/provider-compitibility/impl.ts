// @ts-nocheck

const a = 33;

export const provide: any = (token, {multi = false} = {}) => {
	let options = {
		provide: token,
		...(multi ? {multi} : {}),
	};
	a;
	return {
		useValue: (source) => ({...options, useValue: source}),
		useFactory: (source) => ({...options, useFactory: source}),
		useClass: (source) => ({...options, useClass: source}),
		useExisting: (source) => ({...options, useExisting: source}),
	};
};
