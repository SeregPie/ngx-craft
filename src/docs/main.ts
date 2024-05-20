import {provideHttpClient} from '@angular/common/http';
import {bootstrapApplication} from '@angular/platform-browser';
import {provideAnimations} from '@angular/platform-browser/animations';

import {MyRootComponent} from '@/components/root';
import {myTranslocoProviders} from '@/plugins/transloco';

(async () => {
	try {
		await bootstrapApplication(MyRootComponent, {
			providers: [
				provideAnimations(),
				provideHttpClient(),
				//
				myTranslocoProviders,
			],
		});
	} catch (error) {
		console.error(error);
	}
})();
