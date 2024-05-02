function extend(target: any, ...sources: any[]): any {
	sources.forEach((source) => {
		Reflect.ownKeys(source).forEach((key) => {
			let {enumerable, writable, ...attributes} = Reflect.getOwnPropertyDescriptor(source, key) ?? {};
			Reflect.defineProperty(target, key, {...attributes, configurable: true});
		});
	});
	return target;
}

function create(...sources: any[]): any {
	return extend({}, ...sources);
}

function toString() {
	// todo
	return '';
}

const oo = extend(create, {
	extend,
	toString,
});

export default oo;
export {toString};
