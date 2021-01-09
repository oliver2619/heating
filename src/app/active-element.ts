export type ActiveElementType = 'constant' | 'discrete';

export interface ActiveElementJson {
	id: string;
	name: string;
	type: ActiveElementType;
	maxValue?: number;
	state?: number;
	unit?: string;
}

export class ActiveElement {

	get state(): number {
		return this._state !== undefined ? this._state : 0;
	}

	set state(s: number) {
		this._state = s;
	}

	get type(): ActiveElementType {
		return this._type;
	}

	set type(t: ActiveElementType) {
		this._type = t;
		this._state = t === 'constant' ? 0 : undefined;
		if (t === 'discrete') {
			this.maxValue = undefined;
		}
	}

	get unit(): string {
		return this._unit !== undefined ? this._unit : '';
	}

	set unit(u: string) {
		this._unit = u !== '' ? u : undefined;
	}

	private constructor(public readonly id: string, public name: string, private _type: ActiveElementType, public maxValue: number | undefined, private _state: number | undefined, private _unit: string | undefined) { }

	static load(json: ActiveElementJson): ActiveElement {
		return new ActiveElement(json.id, json.name, json.type, json.maxValue, json.state, json.unit);
	}

	static newElement(id: string, name: string): ActiveElement {
		return new ActiveElement(id, name, 'constant', 1, 0, undefined);
	}

	save(): ActiveElementJson {
		return {
			id: this.id,
			name: this.name,
			type: this.type,
			maxValue: this.maxValue,
			state: this._state,
			unit: this._unit
		};
	}

	setState(value: number): void {
		this._type = 'constant';
		this._state = value;
	}
}