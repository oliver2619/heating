import { Component, ChangeDetectionStrategy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { SystemService } from '../system.service';
import { Recording } from '../recording';

@Component({
	selector: 'h-recording',
	templateUrl: './recording.component.html',
	styleUrls: ['./recording.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class RecordingComponent {

	readonly id: string;
	readonly record: Recording | undefined;
	readonly formGroup: FormGroup;

	get title(): string {
		const system = this.systemService.getSystem(this.id);
		return system !== undefined ? system.name : '';
	}

	constructor(
		private readonly systemService: SystemService,
		activatedRoute: ActivatedRoute,
		formBuilder: FormBuilder
	) {
		this.id = activatedRoute.snapshot.params['id'];
		const recordId = activatedRoute.snapshot.params['time'];
		this.formGroup = formBuilder.group({});
		const system = this.systemService.getSystem(this.id);
		if (system !== undefined) {
			this.record = system.getRecord(recordId);
		}
		this.formGroup.addControl('amount', formBuilder.control(this.record !== undefined ? this.record.amount : null, [Validators.required, Validators.min(1)]));
		this.formGroup.addControl('startTime', formBuilder.control(this.record !== undefined ? this.record.startTime.toLocaleString() : null, [Validators.required]));
		this.formGroup.addControl('endTime', formBuilder.control(this.record !== undefined ? this.record.endTime.toLocaleString() : null, [Validators.required]));
		this.formGroup.addControl('startTemperature', formBuilder.control(this.record !== undefined ? this.record.startTemperature : null, [Validators.required]));
		this.formGroup.addControl('endTemperature', formBuilder.control(this.record !== undefined ? this.record.endTemperature : null, [Validators.required]));
	}
}
