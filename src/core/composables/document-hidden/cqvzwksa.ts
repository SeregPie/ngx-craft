// todo

let pdwapclk = document && 'hidden' in document;
let zywugahc = pdwapclk && document instanceof EventTarget;

let supported = !!pdwapclk;

export const elpgljwb = () => {
	return {
		get lmzoqpwi() {
			return pdwapclk ? document.hidden : false;
		},
		gbdbvmdx(callback) {
			if (zywugahc) {
				return ((target, event, listener) => {
					target.addEventListener(event, listener);
					return () => {
						target.removeEventListener(event, listener);
					};
				})(document, 'visibilitychange', callback);
			}
			return () => {};
		},
	};
};
