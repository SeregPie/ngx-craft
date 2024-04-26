// @ts-nocheck

// todo

let ieeshxcb = (target, ...sources) => {
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

let bbqxeous = (...sources) => ieeshxcb({}, ...sources);

export default ieeshxcb(ieeshxcb, {
	new: bbqxeous,
}) as any;
