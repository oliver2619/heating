import { Injectable } from '@angular/core';
import { System, SystemJson, SystemState } from './system';
import { LocalStorageService } from './local-storage.service';
import { ActiveElement, ActiveElementType } from './active-element';
import { PassiveElement, PassiveElementType } from './passive-element';

interface SystemServiceJson {
	version: 1,
	nextId: number;
}

@Injectable({
	providedIn: 'root'
})
export class SystemService {

	private static readonly KEY = 'system-service';
	private static readonly PREFIX = 'system:';

	private nextId = 0;

	constructor(private localStorageService: LocalStorageService) {
		const json: SystemServiceJson | undefined = this.localStorageService.get(SystemService.KEY);
		if (json !== undefined) {
			this.nextId = json.nextId;
		} else {
			this.save();
		}
	}

	addActiveElement(name: string, type: ActiveElementType, system: System): ActiveElement {
		const ret = ActiveElement.newElement(this.getNextId(), name);
		ret.type = type;
		system.addActiveElement(ret);
		this.saveSystem(system);
		return ret;
	}

	addPassiveElement(name: string, type: PassiveElementType, system: System): PassiveElement {
		const ret = PassiveElement.newElement(this.getNextId(), name);
		ret.type = type;
		system.addPassiveElement(ret);
		this.saveSystem(system);
		return ret;
	}

	addSystem(name: string): System {
		const ret = System.newSystem(this.getNextId(), name, 'l', 'C');
		this.saveSystem(ret);
		return ret;
	}

	deleteActiveElement(system: System, elementId: string): void {
		system.removeActiveElement(elementId);
		this.saveSystem(system);
	}

	deleteHistoryElement(system: System, elementId: string): void {
		system.removeHistoryElement(elementId);
		this.saveSystem(system);
	}

	deletePassiveElement(system: System, elementId: string): void {
		system.removePassiveElement(elementId);
		this.saveSystem(system);
	}

	deleteSystem(id: string): void {
		this.localStorageService.remove(`${SystemService.PREFIX}${id}`);
	}

	getSystem(id: string): System | undefined {
		const json = this.getSystemJson(id);
		return json !== undefined ? System.load(json) : undefined;
	}

	listActiveSystems(): System[] {
		const jsonList: SystemJson[] = <SystemJson[]>this.listKeys().map(key => this.getSystemJson(key));
		return jsonList.filter(json => json.recordingTime !== undefined).map(json => System.load(json));
	}

	listKeys(): string[] {
		return this.localStorageService.list(key => key.startsWith(SystemService.PREFIX)).map(key => key.substring(SystemService.PREFIX.length));
	}

	listSystems(): System[] {
		return <System[]>this.listKeys().map(key => this.getSystem(key));
	}

	saveSystem(system: System): void {
		this.localStorageService.set(`${SystemService.PREFIX}${system.id}`, system.save());
	}

	setSystemTargetTemperature(system: System, targetTemperature: number): void {
		system.targetTemperature = targetTemperature;
		this.saveSystem(system);
	}

	stopSystem(system: System): void {
		system.stop();
		this.saveSystem(system);
	}

	recordSystem(system: System, state: SystemState): void {
		system.record(state, () => this.getNextId());
		this.saveSystem(system);
	}

	getNextId(): string {
		const ret = this.nextId.toString();
		++this.nextId;
		this.save();
		return ret;
	}

	private getSystemJson(id: string): SystemJson | undefined {
		return this.localStorageService.get(`${SystemService.PREFIX}${id}`);
	}

	private save(): void {
		const json: SystemServiceJson = {
			version: 1,
			nextId: this.nextId
		};
		this.localStorageService.set(SystemService.KEY, json);
	}
}
