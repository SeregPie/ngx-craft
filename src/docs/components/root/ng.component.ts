import {NgComponentOutlet} from '@angular/common';
import {ChangeDetectionStrategy, Component} from '@angular/core';
import {RouterModule} from '@angular/router';
import {TranslocoModule} from '@jsverse/transloco';

import {MyDemoComponent} from '../../../core/composables/media-query/demo';

@Component({
	changeDetection: ChangeDetectionStrategy.OnPush,
	imports: [
		//
		RouterModule,
		TranslocoModule,
		NgComponentOutlet,
	],
	selector: 'my-root',
	standalone: true,
	templateUrl: './ng.component.html',
})
export class MyRootComponent {
	constructor() {}

	demo = MyDemoComponent;
}
