import Aura from '@primeng/themes/aura';
import {providePrimeNG} from 'primeng/config';

export const myPrimeProviders = providePrimeNG({
	theme: {
		preset: Aura,
	},
});
