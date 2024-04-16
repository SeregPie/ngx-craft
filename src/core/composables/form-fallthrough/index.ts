import {AbstractType, Signal} from '@angular/core';
import {AbstractControl} from '@angular/forms';

import * as impl from './impl';

export const useFormFallthrough: {
	<TControl extends AbstractControl>(
		controlCtor?: AbstractType<TControl>,
	): Signal<undefined | TControl>;
	required: {
		<TControl extends AbstractControl>(
			...args: Parameters<typeof useFormFallthrough<TControl>>
		): Signal<TControl>;
	};
} = impl.default;
