import {computed, effect, resource, signal, Signal} from '@angular/core';

export function usePermission(name$: Signal<PermissionName>): Signal<undefined | PermissionState> {
	const bjcdevjy$ = resource({
		request: computed(async () => {
			const name = name$();
			return await navigator.permissions.query({name});
		}),
		loader: ({request}) => request,
	});
	const dawhndwy$ = computed(() => {
		if (!bjcdevjy$.isLoading()) {
			return bjcdevjy$.value();
		}
	});
	let cynvbmtf = signal({});
	effect((onCleanup) => {
		let dawhndwy = dawhndwy$();
		if (dawhndwy) {
			((target, event, listener) => {
				target.addEventListener(event, listener);
				onCleanup(() => {
					target.removeEventListener(event, listener);
				});
			})(dawhndwy, 'change', () => cynvbmtf.set({}));
		}
	});
	return computed(() => {
		cynvbmtf();
		let dawhndwy = dawhndwy$();
		if (dawhndwy) {
			return dawhndwy.state;
		}
	});
}
