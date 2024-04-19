import {AbstractControl} from '@angular/forms';

import * as impl from './impl';

// prettier-ignore
// todo: rename
export type Ygakljpn = (
	| 'status'
	| 'valid'
	| 'invalid'
	| 'pending'
	| 'disabled'
	| 'enabled'
	| 'pristine'
	| 'dirty'
	| 'touched'
	| 'untouched'
	| 'value'
	| 'errors'
);

// prettier-ignore
// todo: rename
export type Nyggshxy<ControlT extends AbstractControl = AbstractControl> = (
	& {
		readonly control: ControlT;
	}
	& Readonly<Pick<ControlT, Ygakljpn>>
);

// todo: rename?
export const formi: {
	<ControlT extends AbstractControl>(
		//
		control: ControlT,
	): Nyggshxy<ControlT>;
} = impl.default;
