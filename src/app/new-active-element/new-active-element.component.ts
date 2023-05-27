import { Component, ChangeDetectionStrategy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { SystemService } from '../system.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ActiveElementType } from '../active-element';

interface NewActiveElementComponentValue {
	name: string;
	type: ActiveElementType;
}

@Component({
	selector: 'h-new-active-element',
	templateUrl: './new-active-element.component.html',
	styleUrls: ['./new-active-element.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class NewActiveElementComponent {

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
		this.formGroup.addControl('type', formBuilder.control('constant', Validators.required));
	}

	onSave(): void {
		const value: NewActiveElementComponentValue = this.formGroup.value;
		const system = this.systemService.getSystem(this.id);
		if (system !== undefined) {
			const element = this.systemService.addActiveElement(value.name, value.type, system);
			this.router.navigate(['setup', system.id, 'active', element.id]);
		}
	}
}
