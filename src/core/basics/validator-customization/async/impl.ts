// @ts-nocheck

import {isObservable, lastValueFrom} from 'rxjs';

export const stubAsyncValidator = (errors) => async () => errors;

export const noopAsyncValidator = stubAsyncValidator(null);

export const withAsyncValidators = (control, ...validators) => {
	control.addAsyncValidators(validators);
	control.updateValueAndValidity();
	return control;
};

export const composeAsyncValidators = (validators) => {
	switch (validators.length) {
		case 0:
			return noopAsyncValidator;
		case 1:
			return validators[0];
	}
	return async (control) => {
		for (let validator of validators) {
			let errors = await ((v) => isObservable(v) ? lastValueFrom(v) : v)(validator(control));
			if (errors != null) {
				return errors;
			}
		}
		return null;
	};
};
