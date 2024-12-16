import {Signal} from '@angular/core';
import {AbstractControl} from '@angular/forms';

export function useFormFallthrough<
	//
	ControlT extends AbstractControl,
>(): Signal<undefined | ControlT>;

export namespace useFormFallthrough {
	export function required<
		//
		ControlT extends AbstractControl,
	>(): Signal<ControlT>;
}
