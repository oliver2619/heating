import { Component, ChangeDetectionStrategy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { System } from '../system';
import { SystemService } from '../system.service';
import { ActiveElement, ActiveElementType } from '../active-element';

interface ActiveElementComponentValue {
	name: string;
	type: ActiveElementType | null | undefined;
	maxValue: number | null | undefined;
	unit: string;
}

@Component({
	selector: 'h-active-element',
	templateUrl: './active-element.component.html',
	styleUrls: ['./active-element.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class ActiveElementComponent {

	readonly id: string | undefined;
	readonly aid: string | undefined;
	readonly formGroup: UntypedFormGroup;

	get canSave(): boolean {
		return this.formGroup.valid;
	}

	get canEdit(): boolean {
		const system = this.getSystem();
		return system !== undefined ? system.canEdit : false;
	}

	get hasMaximum(): boolean {
		return this.formGroup.controls['type'].value === 'constant';
	}

	get title(): string {
		const system = this.getSystem();
		return system !== undefined ? system.name : '';
	}

	private get value(): ActiveElementComponentValue {
		return this.formGroup.value;
	}

	constructor(private readonly systemService: SystemService,
		private readonly router: Router,
		activatedRoute: ActivatedRoute,
		formBuilder: UntypedFormBuilder
	) {
		this.formGroup = formBuilder.group({});
		this.id = activatedRoute.snapshot.params['id'];
		this.aid = activatedRoute.snapshot.params['aid'];
		const el = this.getElement();
		this.formGroup.addControl('name', formBuilder.control(el !== undefined ? el.name : '', Validators.required));
		const type = formBuilder.control(el !== undefined ? el.type : '', Validators.required);
		this.formGroup.addControl('type', type);
		this.formGroup.addControl('maxValue', formBuilder.control(el !== undefined ? el.maxValue : null, [Validators.required, Validators.min(1)]));
		this.formGroup.addControl('unit', formBuilder.control(el !== undefined ? el.unit : ''));
		type.valueChanges.subscribe({
			next: value => {
				this.enableMaxValue(value);
			}
		});
		if (!this.canEdit) {
			type.disable();
		}
		if (el !== undefined) {
			this.enableMaxValue(el.type);
		}
	}

	onCancel(): void {
		this.router.navigate(['setup', this.id, 'active']);
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
				if (value.maxValue !== null && value.maxValue !== undefined) {
					element.maxValue = value.maxValue;
				}
				element.unit = value.unit;
				this.systemService.saveSystem(system);
				this.router.navigate(['setup', this.id, 'active']);
			}
		}
	}

	private enableMaxValue(type: ActiveElementType): void {
		if (type === 'constant' && this.canEdit) {
			this.formGroup.controls['maxValue'].enable();
		} else {
			this.formGroup.controls['maxValue'].disable();
		}
	}

	private getSystem(): System | undefined {
		return this.id !== undefined ? this.systemService.getSystem(this.id) : undefined;
	}

	private getElement(system?: System): ActiveElement | undefined {
		if (this.aid !== undefined) {
			if (system === undefined) {
				system = this.getSystem();
			}
			return system !== undefined ? system.getActiveElement(this.aid) : undefined;
		} else {
			return undefined;
		}
	}
}
