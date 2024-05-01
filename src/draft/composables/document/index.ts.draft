import {DOCUMENT} from '@angular/common';
import {inject} from '@angular/core';

export const useDocument: {
	(): undefined | Document;
} = () => {
	// todo
	try {
		let v = inject(DOCUMENT, {optional: true});
		if (v != null) {
			return v;
		}
	} catch {}
	try {
		let {document, Document} = globalThis;
		if (document != null && document instanceof Document) {
			return document;
		}
	} catch {}
};
