export type PassiveElementType = 'temperature' | 'boolean' | 'number';

export interface PassiveElementJson {
	id: string;
	name: string;
	type: PassiveElementType;
	state: number | boolean;
	unit?: string;
}

export class PassiveElement {

	get state(): number | boolean {
		return this._state;
	}

	set state(s: number | boolean) {
		this._state = s;
	}

	get type(): PassiveElementType {
		return this._type;
	}

	set type(t: PassiveElementType) {
		this._type = t;
		switch (t) {
			case 'boolean':
				this._state = false;
				break;
			case 'number':
			case 'temperature':
				this._state = 0;
				break;
			default:
				throw new RangeError(`Illegal type${t}`);
		}
	}

	get unit(): string {
		return this._unit !== undefined ? this._unit : '';
	}

	set unit(u: string) {
		this._unit = u !== '' ? u : undefined;
	}

	private constructor(public readonly id: string, public name: string, private _type: PassiveElementType, private _state: number | boolean, private _unit: string | undefined) { }

	static load(json: PassiveElementJson): PassiveElement {
		return new PassiveElement(json.id, json.name, json.type, json.state, json.unit);
	}

	static newElement(id: string, name: string): PassiveElement {
		return new PassiveElement(id, name, 'temperature', 0, undefined);
	}

	save(): PassiveElementJson {
		return {
			id: this.id,
			name: this.name,
			type: this._type,
			state: this._state,
			unit: this._unit
		};
	}

	setBoolean(value: boolean): void {
		this._state = value;
		this._type = 'boolean';
	}

	setNumber(value: number): void {
		this._state = value;
		this._type = 'number';
	}

	setTemperature(temperature: number): void {
		this._state = temperature;
		this._type = 'temperature';
	}
}