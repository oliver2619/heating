export interface RecordingJson {
	id: string;
	amount: number;
	startTime: number;
	startTemperature: number;
	endTime: number;
	endTemperature: number;
	passiveElements: { [key: string]: boolean | number };
	activeElements: { [key: string]: number };
}

export interface RecordingData {
	id: string;
	amount: number;
	startTime: Date;
	startTemperature: number;
	endTime: Date;
	endTemperature: number;
	passiveElements: { [key: string]: boolean | number };
	activeElements: { [key: string]: number };
}

export class Recording {
	readonly id: string;
	readonly amount: number;
	readonly startTime: Date;
	readonly startTemperature: number;
	readonly endTime: Date;
	readonly endTemperature: number;
	readonly passiveElements: { [key: string]: boolean | number };
	readonly activeElements: { [key: string]: number };

	private constructor(data: RecordingData) {
		this.id = data.id;
		this.amount = data.amount;
		this.startTime = data.startTime;
		this.startTemperature = data.startTemperature;
		this.endTime = data.endTime;
		this.endTemperature = data.endTemperature;
		this.passiveElements = { ...data.passiveElements };
		this.activeElements = { ...data.activeElements };
	}

	static load(json: RecordingJson): Recording {
		const startTime = new Date();
		startTime.setTime(json.startTime);
		const endTime = new Date();
		endTime.setTime(json.endTime);
		return new Recording({
			id: json.id,
			amount: json.amount,
			startTime,
			startTemperature: json.startTemperature,
			endTime,
			endTemperature: json.endTemperature,
			activeElements: { ...json.activeElements },
			passiveElements: { ...json.passiveElements }
		});
	}

	static newRecording(data: RecordingData): Recording {
		return new Recording(data);
	}

	save(): RecordingJson {
		return {
			id: this.id,
			amount: this.amount,
			startTime: this.startTime.getTime(),
			startTemperature: this.startTemperature,
			endTime: this.endTime.getTime(),
			endTemperature: this.endTemperature,
			activeElements: { ...this.activeElements },
			passiveElements: { ...this.passiveElements }
		};
	}
}