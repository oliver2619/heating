import { Component, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { SystemService } from '../system.service';
import { System, SystemState } from '../system';
import { ActivatedRoute } from '@angular/router';
import { UntypedFormGroup, UntypedFormBuilder, Validators } from '@angular/forms';
import { TranslateService } from '../translate.service';
import { MessageBoxService } from '../message-box.service';
import { MessageBoxQuestion, MessageBoxResult } from '../message-box';
import { ToastService } from '../toast.service';

type HeatingComponentParameterType = 'number' | 'boolean';

interface HeatingComponentParameter {
	name: string;
	formControlName: string;
	type: HeatingComponentParameterType;
	unit: string;
	hasUnit: boolean;
	errorText?: string;
}

interface HeatingComponentEnergySupply {
	id: string;
	name: string;
	unit: string;
	hasUnit: boolean;
	formControlName: string;
}

interface HeatingComponentSystemValue {
	amount: number;
	temperature: number;
}

type HeatingComponentParameterValue = { [key: string]: number | boolean };

@Component({
	selector: 'h-heating',
	templateUrl: './heating.component.html',
	styleUrls: ['./heating.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeatingComponent {

	private static readonly ACTIVE_PREFIX = 'active.';
	private static readonly PASSIVE_PREFIX = 'passive.';

	readonly id: string;
	readonly systemForm: UntypedFormGroup;
	readonly parametersForm: UntypedFormGroup;
	readonly energySuppliersForm: UntypedFormGroup;
	readonly inputParameters: HeatingComponentParameter[];
	readonly energySuppliers: HeatingComponentEnergySupply[];

	private system: System | undefined;

	get amountUnit(): string {
		return this.system !== undefined ? this.system.amountUnit : '';
	}

	get canRecord(): boolean {
		return this.system !== undefined && this.system.canStart() && this.systemForm.valid && this.parametersForm.valid;
	}

	get canStop(): boolean {
		return this.system !== undefined ? this.system.isRecording : false;
	}

	get hasAmountUnit(): boolean {
		return this.system !== undefined && this.system.amountUnit !== '';
	}

	get hasTemperatureUnit(): boolean {
		return this.system !== undefined && this.system.temperatureUnit !== '';
	}

	get isRecording(): boolean {
		return this.system !== undefined ? this.system.isRecording : false;
	}

	get temperatureUnit(): string {
		return this.system !== undefined ? this.system.temperatureUnit : '';
	}

	get title(): string {
		return this.system !== undefined ? this.system.name : '';
	}

	private get state(): SystemState {
		const systemValue: HeatingComponentSystemValue = this.systemForm.value;
		const ret: SystemState = {
			amount: systemValue.amount,
			temperature: systemValue.temperature,
			activeElements: {},
			passiveElements: {}
		};
		if (this.system !== undefined) {
			const parameters: HeatingComponentParameterValue = this.parametersForm.value;
			this.system.passiveElements.forEach(e => {
				ret.passiveElements[e.id] = parameters[`${HeatingComponent.PASSIVE_PREFIX}${e.id}`];
			});
			this.system.activeElements.filter(e => e.type === 'constant').forEach(e => {
				ret.activeElements[e.id] = <number>parameters[`${HeatingComponent.ACTIVE_PREFIX}${e.id}`];
			});
		}

		return ret;
	}

	constructor(private readonly systemService: SystemService,
		private readonly messageBoxService: MessageBoxService,
		private readonly toastService: ToastService,
		private readonly translateService: TranslateService,
		private readonly changeDetectorRef: ChangeDetectorRef,
		activatedRoute: ActivatedRoute,
		formBuilder: UntypedFormBuilder
	) {
		this.id = activatedRoute !== null ? activatedRoute.snapshot.params['id'] : undefined;
		this.system = this.id !== undefined ? this.systemService.getSystem(this.id) : undefined;
		this.systemForm = formBuilder.group({});
		this.systemForm.addControl('amount', formBuilder.control(this.system !== undefined ? this.system.amount : null, [Validators.required, Validators.min(1)]));
		this.systemForm.addControl('temperature', formBuilder.control(this.system !== undefined ? this.system.temperature : null, [Validators.required, Validators.min(-273.15)]));
		this.parametersForm = formBuilder.group({});
		this.energySuppliersForm = formBuilder.group({});
		if (this.system !== undefined) {
			const passive = this.system.passiveElements.map(e => {
				const id = `${HeatingComponent.PASSIVE_PREFIX}${e.id}`;
				const ret: HeatingComponentParameter = {
					formControlName: id,
					name: e.name,
					type: e.type === 'boolean' ? 'boolean' : 'number',
					unit: e.type === 'temperature' ? `\u00b0 ${e.unit}` : e.unit,
					hasUnit: e.unit !== ''
				};
				if (e.type === 'boolean') {
					this.parametersForm.addControl(id, formBuilder.control(String(e.state), [Validators.required]));
				} else if (e.type === 'temperature') {
					this.parametersForm.addControl(id, formBuilder.control(e.state, [Validators.required, Validators.min(-273.15)]));
					ret.errorText = this.translateService.get('err.temperature');
				} else {
					this.parametersForm.addControl(id, formBuilder.control(e.state, [Validators.required]));
				}
				return ret;
			});
			const active = this.system.activeElements.filter(e => e.type === 'constant').map(e => {
				const id = `${HeatingComponent.ACTIVE_PREFIX}${e.id}`;
				const ret: HeatingComponentParameter = {
					formControlName: id,
					name: e.name,
					type: 'number',
					unit: e.unit,
					hasUnit: e.unit !== '',
					errorText: translateService.get('err.valueNotInRange', 0, e.maxValue)
				};
				this.parametersForm.addControl(id, formBuilder.control(e.state, [Validators.required, Validators.min(0), Validators.max(<number>e.maxValue)]));
				return ret;
			});
			this.inputParameters = [...passive, ...active];
			this.energySuppliers = this.system.activeElements.filter(e => e.type === 'discrete').map(e => {
				const id = `${HeatingComponent.ACTIVE_PREFIX}${e.id}`;
				const ret: HeatingComponentEnergySupply = {
					id: e.id,
					formControlName: id,
					name: e.name,
					unit: e.unit,
					hasUnit: e.unit !== ''
				};
				this.energySuppliersForm.addControl(id, formBuilder.control(1, [Validators.required, Validators.min(1)]));
				return ret;
			});
		} else {
			this.inputParameters = [];
			this.energySuppliers = [];
		}
	}

	onInsertEnergy(id: string, amount: number): void {
		if (this.system !== undefined) {
			const e = this.system.getActiveElement(id);
			if (e !== undefined) {
				const s = this.state;
				s.activeElements[id] = amount;
				this.systemService.recordSystem(this.system, s);
				const msg = this.translateService.get('info.insertedElement', amount, e.name);
				this.toastService.info(msg);
			}
		}
	}

	onRecord(): void {
		if (this.system !== undefined) {
			this.systemService.recordSystem(this.system, this.state);
			this.toastService.info(this.translateService.get('info.snapshotRecorded'));
			this.changeDetectorRef.markForCheck();
		}
	}

	onStop(): void {
		const system = this.system;
		if (system !== undefined) {
			const d = new Date();
			const time = `${d.toLocaleDateString()} ${d.toLocaleTimeString()}`;
			this.messageBoxService.question(this.translateService.get('question.stopRecording', time), MessageBoxQuestion.YES_NO).subscribe({
				next: result => {
					if (result === MessageBoxResult.YES) {
						this.systemService.stopSystem(system);
						this.toastService.info(this.translateService.get('info.stopRecording'));
						this.changeDetectorRef.markForCheck();
					}
				}
			});
		}
	}
}
