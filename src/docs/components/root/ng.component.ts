import {CommonModule} from '@angular/common';
import {ChangeDetectionStrategy, Component} from '@angular/core';
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
	constructor() {}

	wlxlelhm = useMediaQuery('(min-width: 800px)');
}
