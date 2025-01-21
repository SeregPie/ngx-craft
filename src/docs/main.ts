import {provideHttpClient} from '@angular/common/http';
import {bootstrapApplication} from '@angular/platform-browser';
import {provideAnimationsAsync} from '@angular/platform-browser/animations/async';

import {MyRootComponent} from './components/root';
import {myPrimeProviders} from './plugins/prime';
import {myTranslocoProviders} from './plugins/transloco';

bootstrapApplication(MyRootComponent, {
	providers: [
		provideAnimationsAsync(),
		provideHttpClient(),
		//
		myPrimeProviders,
		myTranslocoProviders,
	],
});
