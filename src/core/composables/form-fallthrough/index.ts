import {AbstractType, Signal} from '@angular/core';
import {AbstractControl} from '@angular/forms';

export const useFormFallthrough: {
	<ControlT extends AbstractControl>(
		// todo: rename
		controlCtor?: AbstractType<ControlT>,
	): Signal<undefined | ControlT>;
	required: {
		<ControlT extends AbstractControl>(
			...args: Parameters<typeof useFormFallthrough<ControlT>>
		): Signal<ControlT>;
	};
} = null as any;
