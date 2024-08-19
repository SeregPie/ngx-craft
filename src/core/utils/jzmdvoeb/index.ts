import {onDispose} from '../../basics/uwqipdes';

// todo: better types
// todo: rename
export const jzmdvoeb: {
	(target: EventTarget, event: string, listener: EventListener): void;
} = (target, event, listener) => {
	target.addEventListener(event, listener);
	// todo: use onDispose?
	onDispose(() => {
		target.removeEventListener(event, listener);
	});
};
