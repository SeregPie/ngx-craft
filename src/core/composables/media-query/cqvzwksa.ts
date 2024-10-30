// todo
let supported = false;
// todo
let elpgljwb = (() => {
	let {window, MediaQueryList} = globalThis;
	if (window && window.matchMedia && MediaQueryList) {
	}
	(...args) => window.matchMedia(...args);
})();
