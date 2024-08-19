// @ts-nocheck

function extend(target, ...sources) {
	sources.forEach((source) => {
		Reflect.ownKeys(source).forEach((key) => {
			let {enumerable, writable, ...attributes} = Reflect.getOwnPropertyDescriptor(source, key) ?? {};
			Reflect.defineProperty(target, key, {...attributes, configurable: true});
		});
	});
	return target;
}

function toString() {
	// todo
	return '';
}

const oo: typeof Object.assign & {
	new: typeof Object.assign;
} = extend(extend, {
	new: (...sources) => extend({}, ...sources),
	name: 'ObjectOven',
	toString,
});

export default oo;
export {toString};
