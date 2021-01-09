import { Component, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { SystemService } from '../system.service';
import { System } from '../system';
import { ActivatedRoute } from '@angular/router';

interface SetupComponentValue {
	name: string;
	amountUnit: string;
	temperatureUnit: string;
}

@Component({
	selector: 'h-setup-common',
	templateUrl: './setup-common.component.html',
	styleUrls: ['./setup-common.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class SetupCommonComponent {

	readonly formGroup: FormGroup;

	private id: string | undefined;

	get canSave(): boolean {
		return this.formGroup.valid;
	}

	get isModified(): boolean {
		return this.formGroup.dirty;
	}

	constructor(private readonly systemService: SystemService,
		private readonly changeDetectorRef: ChangeDetectorRef,
		formBuilder: FormBuilder,
		activatedRoute: ActivatedRoute
	) {
		this.formGroup = formBuilder.group({});
		this.id = activatedRoute.parent !== null ? activatedRoute.parent.snapshot.params['id'] : undefined;
		const system = this.getSystem();
		this.formGroup.addControl('name', formBuilder.control(system !== undefined ? system.name : '', Validators.required));
		this.formGroup.addControl('amountUnit', formBuilder.control(system !== undefined ? system.amountUnit : ''));
		this.formGroup.addControl('temperatureUnit', formBuilder.control(system !== undefined ? system.temperatureUnit : ''));
	}

	onCancel(): void {
		const system = this.getSystem();
		if (system !== undefined) {
			const val: SetupComponentValue = {
				name: system.name,
				amountUnit: system.amountUnit,
				temperatureUnit: system.temperatureUnit
			};
			this.formGroup.reset(val);
			this.changeDetectorRef.markForCheck();
		}
	}

	onSave(): void {
		const system = this.getSystem();
		if (system !== undefined) {
			const data = <SetupComponentValue>this.formGroup.value;
			system.name = data.name;
			system.amountUnit = data.amountUnit;
			system.temperatureUnit = data.temperatureUnit;
			this.systemService.saveSystem(system);
			this.formGroup.markAsPristine();
		}
	}

	private getSystem(): System | undefined {
		return this.id !== undefined ? this.systemService.getSystem(this.id) : undefined;
	}
}
