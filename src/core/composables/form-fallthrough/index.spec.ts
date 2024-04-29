import {Component, computed, signal} from '@angular/core';
import {TestBed, fakeAsync} from '@angular/core/testing';
import {FormArray, FormControl, FormGroup, FormRecord, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {By} from '@angular/platform-browser';
import {simpleFaker as faker} from '@faker-js/faker';

import {useFormFallthrough} from './';

describe('useFormFallthrough', () => {
	it('should work with FormControlDirective', fakeAsync(async () => {
		let form = new FormRecord({
			a: new FormControl(null),
			b: new FormControl(null),
		});
		let formSwitch$ = signal<string>('a');

		@Component({
			selector: 'my-sub',
			standalone: true,
			template: '',
		})
		class MySubComponent {
			result = useFormFallthrough();
		}

		@Component({
			imports: [ReactiveFormsModule, MySubComponent],
			standalone: true,
			template: `<my-sub [formControl]="form()" />`,
		})
		class MyComponent {
			form = computed(() => form.controls[formSwitch$()]);
		}

		let fixture = TestBed.createComponent(MyComponent);
		fixture.detectChanges();
		let {result}: MySubComponent = fixture.debugElement.query(By.directive(MySubComponent)).componentInstance;

		expect(result()).toBe(form.controls.a);

		formSwitch$.set('b');
		fixture.detectChanges();

		expect(result()).toBe(form.controls.b);
	}));

	it('should work with FormControlNameDirective', fakeAsync(async () => {
		let form = new FormRecord({
			a: new FormControl(null),
			b: new FormControl(null),
		});
		let formSwitch$ = signal<string>('a');

		@Component({
			selector: 'my-sub',
			standalone: true,
			template: '',
		})
		class MySubComponent {
			result = useFormFallthrough();
		}

		@Component({
			imports: [ReactiveFormsModule, MySubComponent],
			standalone: true,
			template: `
				<ng-container [formGroup]="form">
					<my-sub [formControlName]="formSwitch()" />
				</ng-container>
			`,
		})
		class MyComponent {
			form = form;
			formSwitch = formSwitch$;
		}

		let fixture = TestBed.createComponent(MyComponent);
		fixture.detectChanges();
		let {result}: MySubComponent = fixture.debugElement.query(By.directive(MySubComponent)).componentInstance;

		expect(result()).toBe(form.controls.a);

		formSwitch$.set('b');
		fixture.detectChanges();

		// https://github.com/angular/angular/issues/28979
		expect(result()).toBe(form.controls.a);
	}));

	it('should work with FormGroupDirective', fakeAsync(async () => {
		let form = new FormRecord({
			a: new FormGroup({}),
			b: new FormGroup({}),
		});
		let formSwitch$ = signal<string>('a');

		@Component({
			selector: 'my-sub',
			standalone: true,
			template: '',
		})
		class MySubComponent {
			result = useFormFallthrough();
		}

		@Component({
			imports: [ReactiveFormsModule, MySubComponent],
			standalone: true,
			template: `<my-sub [formGroup]="form()" />`,
		})
		class MyComponent {
			form = computed(() => form.controls[formSwitch$()]);
		}

		let fixture = TestBed.createComponent(MyComponent);
		fixture.detectChanges();
		let {result}: MySubComponent = fixture.debugElement.query(By.directive(MySubComponent)).componentInstance;

		expect(result()).toBe(form.controls.a);

		formSwitch$.set('b');
		fixture.detectChanges();

		expect(result()).toBe(form.controls.b);
	}));

	it('should work with FormGroupNameDirective', fakeAsync(async () => {
		let form = new FormRecord({
			a: new FormGroup({}),
			b: new FormGroup({}),
		});
		let formSwitch$ = signal<string>('a');

		@Component({
			selector: 'my-sub',
			standalone: true,
			template: '',
		})
		class MySubComponent {
			result = useFormFallthrough();
		}

		@Component({
			imports: [ReactiveFormsModule, MySubComponent],
			standalone: true,
			template: `
				<ng-container [formGroup]="form">
					<my-sub [formGroupName]="formSwitch()" />
				</ng-container>
			`,
		})
		class MyComponent {
			form = form;
			formSwitch = formSwitch$;
		}

		let fixture = TestBed.createComponent(MyComponent);
		fixture.detectChanges();
		let {result}: MySubComponent = fixture.debugElement.query(By.directive(MySubComponent)).componentInstance;

		expect(result()).toBe(form.controls.a);

		formSwitch$.set('b');
		fixture.detectChanges();

		expect(result()).toBe(form.controls.b);
	}));

	it('should work with FormArrayNameDirective', fakeAsync(async () => {
		let form = new FormRecord({
			a: new FormArray([]),
			b: new FormArray([]),
		});
		let formSwitch$ = signal<string>('a');

		@Component({
			selector: 'my-sub',
			standalone: true,
			template: '',
		})
		class MySubComponent {
			result = useFormFallthrough();
		}

		@Component({
			imports: [ReactiveFormsModule, MySubComponent],
			standalone: true,
			template: `
				<ng-container [formGroup]="form">
					<my-sub [formArrayName]="formSwitch()" />
				</ng-container>
			`,
		})
		class MyComponent {
			form = form;
			formSwitch = formSwitch$;
		}

		let fixture = TestBed.createComponent(MyComponent);
		fixture.detectChanges();
		let {result}: MySubComponent = fixture.debugElement.query(By.directive(MySubComponent)).componentInstance;

		expect(result()).toBe(form.controls.a);

		formSwitch$.set('b');
		fixture.detectChanges();

		expect(result()).toBe(form.controls.b);
	}));

	it('should work with NgModelDirective', fakeAsync(async () => {
		let value$ = signal<number>(0);

		@Component({
			selector: 'my-sub',
			standalone: true,
			template: '',
		})
		class MySubComponent {
			result = useFormFallthrough.required<FormControl<number>>();
		}

		@Component({
			imports: [FormsModule, MySubComponent],
			standalone: true,
			template: `<my-sub [(ngModel)]="value" />`,
		})
		class MyComponent {
			value = value$;
		}

		let fixture = TestBed.createComponent(MyComponent);
		fixture.detectChanges();
		let {result}: MySubComponent = fixture.debugElement.query(By.directive(MySubComponent)).componentInstance;
		let form = result();

		for await (let _ of (async function* () {
			yield;
			for (let i = 2; i--; ) {
				for (let fn of [
					//
					(v) => form.setValue(v),
					(v) => value$.set(v),
				] as Iterable<{(v: number): void}>) {
					fn(faker.number.int());
					fixture.detectChanges();
					yield;
				}
			}
		})()) {
			expect(form.value).toEqual(value$());
		}
	}));

	it('should return nothing if not available', fakeAsync(async () => {
		@Component({
			standalone: true,
			template: '',
		})
		class MyComponent {
			result = useFormFallthrough();
		}

		let fixture = TestBed.createComponent(MyComponent);
		fixture.detectChanges();
		let {result} = fixture.componentInstance;

		expect(result()).toBeUndefined();
	}));

	it('should check type and return nothing if not available', () => {
		let form = new FormGroup({});

		@Component({
			selector: 'my-sub',
			standalone: true,
			template: '',
		})
		class MySubComponent {
			result = useFormFallthrough(FormArray);
		}

		@Component({
			imports: [ReactiveFormsModule, MySubComponent],
			standalone: true,
			template: `<my-sub [formGroup]="form" />`,
		})
		class MyComponent {
			form = form;
		}

		let fixture = TestBed.createComponent(MyComponent);
		fixture.detectChanges();
		let {result}: MySubComponent = fixture.debugElement.query(By.directive(MySubComponent)).componentInstance;

		expect(result()).toBeUndefined();
	});

	it('should throw if required but not available', fakeAsync(async () => {
		@Component({
			standalone: true,
		})
		class MyComponent {
			result = useFormFallthrough.required();
		}

		let fixture = TestBed.createComponent(MyComponent);
		fixture.detectChanges();
		let {result} = fixture.componentInstance;

		expect(result).toThrow();
	}));

	it('should check type and throw if required but not available', () => {
		let form = new FormGroup({});

		@Component({
			selector: 'my-sub',
			standalone: true,
			template: '',
		})
		class MySubComponent {
			result = useFormFallthrough.required(FormArray);
		}

		@Component({
			imports: [ReactiveFormsModule, MySubComponent],
			standalone: true,
			template: `<my-sub [formGroup]="form" />`,
		})
		class MyComponent {
			form = form;
		}

		let fixture = TestBed.createComponent(MyComponent);
		fixture.detectChanges();
		let {result}: MySubComponent = fixture.debugElement.query(By.directive(MySubComponent)).componentInstance;

		expect(result).toThrow();
	});
});
