import { Component, ChangeDetectionStrategy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PassiveElementType, PassiveElement } from '../passive-element';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { SystemService } from '../system.service';
import { System } from '../system';

interface PassiveElementComponentValue {
	name: string;
	type: PassiveElementType | null | undefined;
	unit: string;
}

@Component({
	selector: 'h-passive-element',
	templateUrl: './passive-element.component.html',
	styleUrls: ['./passive-element.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class PassiveElementComponent {

	readonly id: string | undefined;
	readonly pid: string | undefined;
	readonly formGroup: FormGroup;

	get canEdit(): boolean {
		const system = this.getSystem();
		return system !== undefined ? system.canEdit : false;
	}

	get canSave(): boolean {
		return this.formGroup.valid;
	}

	get hasUnit(): boolean {
		return this.value.type !== 'boolean';
	}

	get title(): string {
		const system = this.getSystem();
		return system !== undefined ? system.name : '';
	}

	private get value(): PassiveElementComponentValue {
		return this.formGroup.value;
	}

	constructor(private readonly systemService: SystemService,
		private readonly router: Router,
		activatedRoute: ActivatedRoute,
		formBuilder: FormBuilder
	) {
		this.formGroup = formBuilder.group({});
		this.id = activatedRoute.snapshot.params['id'];
		this.pid = activatedRoute.snapshot.params['pid'];
		const el = this.getElement();
		this.formGroup.addControl('name', formBuilder.control(el !== undefined ? el.name : '', Validators.required));
		this.formGroup.addControl('unit', formBuilder.control(el !== undefined ? el.unit : ''));
		const type = formBuilder.control(el !== undefined ? el.type : '', Validators.required);
		this.formGroup.addControl('type', type);
		if (!this.canEdit) {
			type.disable();
		}
	}

	onCancel(): void {
		this.router.navigate(['setup', this.id, 'passive']);
	}

	onSave(): void {
		const system = this.getSystem();
		if (system !== undefined) {
			const element = this.getElement(system);
			if (element !== undefined) {
				const value = this.value;
				element.name = value.name;
				if (value.type !== null && value.type !== undefined) {
					element.type = value.type;
				}
				element.unit = value.unit;
				this.systemService.saveSystem(system);
				this.router.navigate(['setup', this.id, 'passive']);
			}
		}
	}

	private getSystem(): System | undefined {
		return this.id !== undefined ? this.systemService.getSystem(this.id) : undefined;
	}

	private getElement(system?: System): PassiveElement | undefined {
		if (this.pid !== undefined) {
			if (system === undefined) {
				system = this.getSystem();
			}
			return system !== undefined ? system.getPassiveElement(this.pid) : undefined;
		} else {
			return undefined;
		}
	}
}
