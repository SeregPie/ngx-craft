// @ts-nocheck

export const stubValidator = (errors) => () => errors;

export const noopValidator = stubValidator(null);

export const withValidators = (control, ...validators) => {
	control.addValidators(validators);
	control.updateValueAndValidity();
	return control;
};

export const composeValidators = (validators) => {
	switch (validators.length) {
		case 0:
			return noopValidator;
		case 1:
			return validators[0];
	}
	return (control) => {
		for (let validator of validators) {
			let errors = validator(control);
			if (errors != null) {
				return errors;
			}
		}
		return null;
	};
};
