import {HttpClient} from '@angular/common/http';
import {inject, Injectable, makeEnvironmentProviders} from '@angular/core';
import {provideTransloco, Translation, TranslocoLoader} from '@jsverse/transloco';
import {provideTranslocoMessageformat} from '@jsverse/transloco-messageformat';

@Injectable({
	providedIn: 'root',
})
export class MyTranslocoLoader implements TranslocoLoader {
	constructor() {}

	http = inject(HttpClient);

	getTranslation(lang: string) {
		return this.http.get<Translation>(`/assets/i18n/${lang}.json`);
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
