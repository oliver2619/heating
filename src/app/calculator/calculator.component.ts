import { Component, ChangeDetectionStrategy, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { System } from '../system';
import { SystemService } from '../system.service';
import { TranslateService } from '../translate.service';

interface CalculatorComponentValue {
	estimatedTemperature: number;
	targetTemperature: number;
	duration: string;
}

@Component({
	selector: 'h-calculator',
	templateUrl: './calculator.component.html',
	styleUrls: ['./calculator.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class CalculatorComponent implements OnInit, OnDestroy {

	readonly id: string;
	readonly formGroup: UntypedFormGroup;

	durationUnit: string | undefined;

	private system: System | undefined;
	private timer: number | undefined;

	get hasDurationUnit(): boolean {
		return this.durationUnit !== undefined;
	}

	get hasTargetTemperature(): boolean {
		return this.formGroup.controls['targetTemperature'].valid;
	}

	get hasTemperatureUnit(): boolean {
		return this.system !== undefined && this.system.temperatureUnit !== '';
	}

	get temperatureUnit(): string {
		return this.system !== undefined ? this.system.temperatureUnit : '';
	}

	get title(): string {
		return this.system !== undefined ? this.system.name : '';
	}

	constructor(
		private readonly systemService: SystemService,
		private readonly translateService: TranslateService,
		activatedRoute: ActivatedRoute,
		formBuilder: UntypedFormBuilder
	) {
		this.id = activatedRoute !== null ? activatedRoute.snapshot.params['id'] : undefined;
		this.system = this.id !== undefined ? this.systemService.getSystem(this.id) : undefined;
		this.formGroup = formBuilder.group({});
		this.formGroup.addControl('estimatedTemperature', formBuilder.control(null));
		this.formGroup.addControl('targetTemperature', formBuilder.control(this.system !== undefined ? this.system.targetTemperature : null, [Validators.required, Validators.min(-273.15)]));
		this.formGroup.addControl('duration', formBuilder.control(null));
	}

	ngOnDestroy(): void {
		clearInterval(this.timer);
		this.timer = undefined;
	}

	ngOnInit(): void {
		this.timer = setInterval(() => this.update(), 1000);
		this.update();
	}

	private updateEstimatedTemperature(): void {
		if (this.system !== undefined) {
			const temp = this.system.getEstimatedTemperature();
			if (temp !== undefined) {
				this.formGroup.controls['estimatedTemperature'].setValue(Math.round(temp));
			}
		}
	}

	private updateDuration(): void {
		if (this.system !== undefined) {
			const duration = this.system.getEstimatedDuration();
			if (duration !== undefined) {
				if (duration >= 86400 * 2) {
					this.formGroup.controls['duration'].setValue((duration / 86400).toFixed(1));
					this.durationUnit = this.translateService.get('days');
				} else if (duration >= 3600) {
					const h = Math.floor(duration / 3600);
					const m = Math.floor(Math.floor(duration - h * 3600) / 60);
					this.formGroup.controls['duration'].setValue(`${h}:${m.toPrecision(2)}`);
					this.durationUnit = this.translateService.get('hours');
				} else {
					this.formGroup.controls['duration'].setValue(Math.floor(duration / 60).toString());
					this.durationUnit = this.translateService.get('minutes');
				}
			}
		}
	}

	private update(): void {
		const value: CalculatorComponentValue = this.formGroup.value;
		if (value.targetTemperature !== null && value.targetTemperature !== undefined && this.system !== undefined) {
			this.systemService.setSystemTargetTemperature(this.system, value.targetTemperature);
		}
		this.updateDuration();
		this.updateEstimatedTemperature();
	}
}
