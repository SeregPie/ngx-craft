// @ts-nocheck

// todo

let ieeshxcb: typeof Object.assign = (target, ...sources) => {
	sources.forEach((source) => {
		Reflect.ownKeys(source).forEach((key) => {
			let descriptor = Reflect.getOwnPropertyDescriptor(source, key);
			descriptor.configurable = true;
			delete descriptor.enumerable;
			delete descriptor.writable;
			Reflect.defineProperty(target, key, descriptor);
		});
	});
	return target;
};

let bbqxeous: typeof Object.assign = (...sources) => ieeshxcb({}, ...sources);

export default ieeshxcb(ieeshxcb, {
	new: bbqxeous,
}) as any;
