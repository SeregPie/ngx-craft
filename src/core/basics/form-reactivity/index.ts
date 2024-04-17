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
export type Nyggshxy<
	TControl extends AbstractControl = AbstractControl,
> = (
	& {
		readonly control: TControl;
	}
	& Readonly<Pick<TControl, Ygakljpn>>
);

// todo: rename?
export const formi: {
	<TControl extends AbstractControl>(
		//
		control: TControl,
	): Nyggshxy<TControl>;
} = impl.default;
