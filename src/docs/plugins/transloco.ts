import {HttpClient} from '@angular/common/http';
import {inject, Injectable, makeEnvironmentProviders} from '@angular/core';
import {provideTransloco, Translation, TranslocoLoader} from '@jsverse/transloco';
import {provideTranslocoMessageformat} from '@jsverse/transloco-messageformat';
import {Observable} from 'rxjs';

@Injectable({
	providedIn: 'root',
})
export class MyTranslocoLoader implements TranslocoLoader {
	constructor() {}

	ngHttpClient = inject(HttpClient);

	getTranslation(lang: string): Observable<Translation> {
		return this.ngHttpClient.get<Translation>(`/assets/i18n/${lang}.json`);
	}
}

export const myTranslocoProviders = makeEnvironmentProviders([
	provideTransloco({
		config: {
			availableLangs: ['en'],
			defaultLang: 'en',
		},
		loader: MyTranslocoLoader,
	}),
	provideTranslocoMessageformat(),
]);
