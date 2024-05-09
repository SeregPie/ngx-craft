function extend(target: any, ...sources: any[]): any {
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

const oo = extend(extend, {
	new(...sources: any[]): any {
		return this({}, ...sources);
	},
	name: 'ObjectOven',
	toString,
});

export default oo;
export {toString};
