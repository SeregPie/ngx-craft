import {provideRouter} from '@angular/router';

export const myRouterProviders = provideRouter([
	{
		path: '/',
	},
	{
		path: '**',
		redirectTo: '/',
	},
]);
