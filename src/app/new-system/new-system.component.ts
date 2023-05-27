import { Component, ChangeDetectionStrategy } from '@angular/core';
import { UntypedFormGroup, UntypedFormBuilder, Validators } from '@angular/forms';
import { SystemService } from '../system.service';
import { Router } from '@angular/router';

interface NewSystemComponentValue {
	name: string;
}

@Component({
	selector: 'h-new-system',
	templateUrl: './new-system.component.html',
	styleUrls: ['./new-system.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class NewSystemComponent {

	readonly formGroup: UntypedFormGroup;

	get canSave(): boolean {
		return this.formGroup.valid;
	}

	constructor(
		private readonly systemService: SystemService,
		private readonly router: Router,
		formBuilder: UntypedFormBuilder
	) {
		this.formGroup = formBuilder.group({});
		this.formGroup.addControl('name', formBuilder.control('', Validators.required));
	}

	onSave(): void {
		const value: NewSystemComponentValue = this.formGroup.value;
		const system = this.systemService.addSystem(value.name);
		this.router.navigate(['setup', system.id]);
	}
}
