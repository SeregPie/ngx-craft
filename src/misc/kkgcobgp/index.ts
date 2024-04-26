// todo

export const o: typeof Object.assign = (target: any, ...sources: any[]) => {
	sources.forEach((source) => {
		[
			...Object.getOwnPropertyNames(source),
			...Object.getOwnPropertySymbols(source),
		].forEach((key) => {
			let descriptor = Object.getOwnPropertyDescriptor(source, key)!;
			delete descriptor.enumerable;
			delete descriptor.writable;
			Object.defineProperty(target, key, descriptor);
		});
	});
	return target;
};
