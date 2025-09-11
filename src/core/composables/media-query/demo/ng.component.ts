import {Component, computed, effect, signal} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';
import {TranslocoModule} from '@jsverse/transloco';
import {SliderModule} from 'primeng/slider';

import {useMediaQuery} from '..';

@Component({
	imports: [
		//
		FormsModule,
		RouterModule,
		SliderModule,
		TranslocoModule,
	],
	selector: 'my-demo',
	templateUrl: './ng.component.html',
})
export class MyDemoComponent {
	constructor() {
		effect(() => {
			console.log(this.wlxlelhm());
		});
	}

	range = signal<[number, number]>([0, 120]);

	media = computed(() => `(${this.range()[0]}rem <= width <= ${this.range()[1]}rem)`);

	wlxlelhm = useMediaQuery(this.media);
}
