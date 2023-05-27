import { Component, ChangeDetectionStrategy } from '@angular/core';
import { PassiveElementType } from '../passive-element';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { SystemService } from '../system.service';
import { Router, ActivatedRoute } from '@angular/router';

interface NewPassiveElementComponentValue {
	name: string;
	type: PassiveElementType;
}

@Component({
	selector: 'h-new-passive-element',
	templateUrl: './new-passive-element.component.html',
	styleUrls: ['./new-passive-element.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class NewPassiveElementComponent {

	readonly id: string;
	readonly formGroup: FormGroup;

	get canSave(): boolean {
		return this.formGroup.valid;
	}

	get title(): string {
		const system = this.systemService.getSystem(this.id);
		return system !== undefined ? system.name : '';
	}

	constructor(
		private readonly systemService: SystemService,
		private readonly router: Router,
		formBuilder: FormBuilder,
		activatedRoute: ActivatedRoute
	) { 
		this.id = activatedRoute.snapshot.params['id'];
		this.formGroup = formBuilder.group({});
		this.formGroup.addControl('name', formBuilder.control('', Validators.required));
		this.formGroup.addControl('type', formBuilder.control('number', Validators.required));
	}

	onSave(): void {
		const value: NewPassiveElementComponentValue = this.formGroup.value;
		const system = this.systemService.getSystem(this.id);
		if (system !== undefined) {
			const element = this.systemService.addPassiveElement(value.name, value.type, system);
			this.router.navigate(['setup', system.id, 'passive', element.id]);
		}
	}
}
