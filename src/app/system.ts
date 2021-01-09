import { ActiveElement, ActiveElementJson } from './active-element';
import { PassiveElement, PassiveElementJson } from './passive-element';
import { Recording, RecordingJson } from './recording';

export interface SystemJson {
	version: 1;
	id: string;
	name: string;
	recordingTime: number | undefined;
	amount: number;
	amountUnit: string;
	temperature: number;
	targetTemperature: number;
	temperatureUnit: string;
	activeElements: ActiveElementJson[];
	passiveElements: PassiveElementJson[];
	recordHistory: RecordingJson[];
}

export interface SystemState {
	amount: number;
	temperature: number;
	passiveElements: { [key: string]: number | boolean };
	activeElements: { [key: string]: number };
}

export class System {

	private readonly activeElementsById = new Map<string, ActiveElement>();
	private readonly passiveElementsById = new Map<string, PassiveElement>();
	private readonly recordsById = new Map<string, Recording>();

	targetTemperature = 0;

	private _amount = 0;
	private _temperature = 0;
	private _recordingTime: Date | undefined;

	get activeElements(): ActiveElement[] {
		return Array.from(this.activeElementsById.values());
	}

	get amount(): number {
		return this._amount;
	}

	get canEdit(): boolean {
		return this.recordsById.size === 0;
	}

	get isRecording(): boolean {
		return this._recordingTime !== undefined;
	}

	get history(): Recording[] {
		return Array.from(this.recordsById.values());
	}

	get passiveElements(): PassiveElement[] {
		return Array.from(this.passiveElementsById.values());
	}

	get lastRecordingTime(): Date | undefined {
		return this._recordingTime;
	}

	get temperature(): number {
		return this._temperature;
	}

	private constructor(public readonly id: string, public name: string, public amountUnit: string, public temperatureUnit: string) { }

	static newSystem(id: string, name: string, amountUnit: string, temperatureUnit: string): System {
		return new System(id, name, amountUnit, temperatureUnit);
	}

	static load(json: SystemJson): System {
		const ret = new System(json.id, json.name, json.amountUnit, json.temperatureUnit);
		if (json.recordingTime !== undefined) {
			ret._recordingTime = new Date();
			ret._recordingTime.setTime(json.recordingTime);
		}
		ret._amount = json.amount;
		ret._temperature = json.temperature;
		ret.targetTemperature = json.targetTemperature;
		json.activeElements.forEach(e => ret.activeElementsById.set(e.id, ActiveElement.load(e)));
		json.passiveElements.forEach(e => ret.passiveElementsById.set(e.id, PassiveElement.load(e)));
		json.recordHistory.forEach(e => ret.recordsById.set(e.id, Recording.load(e)));
		return ret;
	}

	addActiveElement(el: ActiveElement): void {
		this.activeElementsById.set(el.id, el);
	}

	addPassiveElement(el: PassiveElement): void {
		this.passiveElementsById.set(el.id, el);
	}

	canStart(): boolean {
		return this.activeElements.length > 0 || this.passiveElements.length > 0;
	}

	getActiveElement(id: string): ActiveElement | undefined {
		return this.activeElementsById.get(id);
	}

	getEstimatedDuration(): number | undefined {
		return Math.random() * 3600;
	}

	getEstimatedTemperature(): number | undefined {
		return Math.random() * 80;
	}

	getPassiveElement(id: string): PassiveElement | undefined {
		return this.passiveElementsById.get(id);
	}

	getRecord(id: string): Recording | undefined {
		return this.recordsById.get(id);
	}

	record(state: SystemState, idGenerator: () => string): void {
		const now = new Date();
		if (this._recordingTime !== undefined) {
			const id = idGenerator();
			const recording = Recording.newRecording({
				id,
				amount: this._amount,
				startTime: this._recordingTime,
				startTemperature: this._temperature,
				endTime: now,
				endTemperature: state.temperature,
				activeElements: {},
				passiveElements: {}
			});
			this.activeElementsById.forEach((value, key) => {
				recording.activeElements[key] = value.state;
			});
			this.passiveElementsById.forEach((value, key) => {
				recording.passiveElements[key] = value.state;
			});
			this.recordsById.set(id, recording);
		}
		this._amount = state.amount;
		this._temperature = state.temperature;
		this._recordingTime = now;
		Object.entries(state.passiveElements).forEach(e => {
			const el = this.passiveElementsById.get(e[0]);
			if (el !== undefined) {
				el.state = e[1];
			}
		});
		Object.entries(state.activeElements).forEach(e => {
			const el = this.activeElementsById.get(e[0]);
			if (el !== undefined) {
				if (el.type === 'constant') {
					el.state = e[1];
				}
			}
		});
	}

	removeActiveElement(id: string): void {
		this.activeElementsById.delete(id);
	}

	removeHistoryElement(id: string): void {
		this.recordsById.delete(id);
	}

	removePassiveElement(id: string): void {
		this.passiveElementsById.delete(id);
	}

	save(): SystemJson {
		return {
			version: 1,
			id: this.id,
			name: this.name,
			recordingTime: this._recordingTime !== undefined ? this._recordingTime.getTime() : undefined,
			amount: this._amount,
			amountUnit: this.amountUnit,
			targetTemperature: this.targetTemperature,
			temperature: this._temperature,
			temperatureUnit: this.temperatureUnit,
			activeElements: Array.from(this.activeElementsById.values()).map(e => e.save()),
			passiveElements: Array.from(this.passiveElementsById.values()).map(e => e.save()),
			recordHistory: Array.from(this.recordsById.values()).map(r => r.save())
		};
	}

	stop(): void {
		this._recordingTime = undefined;
	}
}