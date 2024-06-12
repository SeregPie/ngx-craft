import {CommonModule} from '@angular/common';
import {ChangeDetectionStrategy, Component, inject} from '@angular/core';
import {NG_VALUE_ACCESSOR} from '@angular/forms';
import {RouterModule} from '@angular/router';
import {TranslocoModule} from '@jsverse/transloco';
import {useMediaQuery} from 'ngx-craft';

@Component({
	changeDetection: ChangeDetectionStrategy.OnPush,
	imports: [
		//
		CommonModule,
		RouterModule,
		TranslocoModule,
	],
	selector: 'my-root',
	standalone: true,
	templateUrl: './ng.component.html',
})
export class MyRootComponent {
	constructor() {
		console.log(inject(NG_VALUE_ACCESSOR));
	}

	wlxlelhm = useMediaQuery('(min-width: 800px)');
}
