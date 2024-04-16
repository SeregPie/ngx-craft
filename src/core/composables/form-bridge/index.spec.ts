import {Component, signal} from '@angular/core';
import {TestBed, fakeAsync} from '@angular/core/testing';
import {FormControl, ReactiveFormsModule} from '@angular/forms';
import {By} from '@angular/platform-browser';

import {useFormBridge} from '.';

// todo

describe('useFormBridge', () => {
	it('should work', fakeAsync(async () => {
		let form = new FormControl<number>(1);
		let value$ = signal<null | number>(null);

		@Component({
			selector: 'my-sub',
			standalone: true,
			template: '',
		})
		class MySubComponent {
			result = useFormBridge(value$);
		}

		@Component({
			imports: [ReactiveFormsModule, MySubComponent],
			standalone: true,
			template: `<my-sub [formControl]="form" />`,
		})
		class MyComponent {
			form = form;
		}

		let fixture = TestBed.createComponent(MyComponent);
		fixture.detectChanges();
		// prettier-ignore
		let {result}: MySubComponent = (fixture
			.debugElement
			.query(By.directive(MySubComponent))
			.componentInstance
		);

		expect(value$()).toBe(1);

		form.disable();
		fixture.detectChanges();

		expect(result.disabled()).toBe(true);
	}));
});
