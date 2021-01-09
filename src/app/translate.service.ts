import { Injectable } from '@angular/core';

type Dictionary = { [key: string]: string };

const de: Dictionary = {
	'about': 'Über Heizen',
	'active': 'Aktiv',
	'activeElement': 'Aktives Element',
	'activeSystems': 'Aktive Systeme',
	'amount': 'Menge',
	'amountUnit': 'Mengeneinheit',
	'calculator': 'Rechner',
	'cancel': 'Abbrechen',
	'common': 'Allgemein',
	'constantEnergySource': 'Konstante Energiequelle',
	'days': 'Tage',
	'discreteEnergySupply': 'Diskrete Energiezufuhr',
	'duration': 'Dauer',
	'elements.delete.question': 'Sollen die ausgewählten Elemente permanent gelöscht werden?',
	'endTemperature': 'Endtemperatur',
	'endTime': 'Endzeitpunkt',
	'energySupply': 'Energiezufuhr',
	'err.amount': 'Menge muss grösser als 0 sein.',
	'err.formInvalid': 'Das Formular enthält noch Fehler.',
	'err.maxValue': 'Maximum Wert ist ungültig.',
	'err.nameNotEmpty': 'Name darf nicht leer sein.',
	'err.temperature': 'Temperatur muss über -273.15 sein.',
	'err.valueNotInRange': 'Wert muss zwischen ${0} und ${1} liegen.',
	'estimatedTemperature': 'Geschätzte Temperatur',
	'goToHistory': 'Zu den Aufzeichnungen.',
	'history': 'Aufzeichnungen',
	'info.insertedElement': '${0} \u00D7 ${1} hinzugefügt.',
	'info.snapshotRecorded': 'Aktueller Zustand aufgezeichnet.',
	'info.stopRecording': 'Aufzeichnung beendet.',
	'heating': 'Heizen',
	'hours': 'Stunden',
	'lastRecord': 'Letzte Aufzeichnung',
	'maximum': 'Maximum',
	'minutes': 'Minuten',
	'msg.enterMaxValue': 'Bitte Maximum eingeben.',
	'msg.enterName': 'Bitte Namen eingeben.',
	'name': 'Name',
	'newElement': 'Neu',
	'no': 'Nein',
	'parameters': 'Parameter',
	'passive': 'Passiv',
	'passiveElement': 'Passives Element',
	'question': 'Frage',
	'question.stopRecording': 'Soll die Aufzeichnung abgebrochen und die Messperiode seit ${0} ignoriert werden?',
	'record': 'Aufzeichnung',
	'setting': 'Einstellung',
	'setup': 'Setup',
	'splash.command': 'Tippen zum fortfahren...',
	'splash.title': 'Die unterstützende App zum Heizen oder Kühlen.',
	'startTemperature': 'Starttemperatur',
	'startTime': 'Startzeitpunkt',
	'state': 'Zustand',
	'system': 'System',
	'systems': 'Systeme',
	'systems.empty': 'Keine Systeme gefunden.',
	'systems.delete.question': 'Soll das System permanent gelöscht werden?',
	'targetTemperature': 'Zieltemperatur',
	'temperature': 'Temperatur',
	'temperatureUnit': 'Temperatureinheit',
	'title': 'Heizen',
	'type': 'Typ',
	'unit': 'Einheit',
	'warn.unableToEditCompletely': 'Um alle Parameter ändern zu können, müssen alle Aufzeichnungen gelöscht werden.',
	'yes': 'Ja'
};

const en: Dictionary = {
	'about': 'About Heating',
	'active': 'Active',
	'activeElement': 'Active element',
	'activeSystems': 'Aktive systems',
	'amount': 'Menge',
	'amountUnit': 'Unit for amount',
	'calculator': 'Calculator',
	'cancel': 'Cancel',
	'common': 'Common',
	'constantEnergySource': 'Constant energy source',
	'days': 'Days',
	'discreteEnergySupply': 'Discrete energy supply',
	'duration': 'Duration',
	'elements.delete.question': 'Should the selected elements be deleted permanently?',
	'endTemperature': 'Ending temperature',
	'endTime': 'Ending time',
	'energySupply': 'Energy supply',
	'err.amount': 'Amount must be greater than 0.',
	'err.formInvalid': 'The form still contains errors.',
	'err.maxValue': 'Maximum value is invalid.',
	'err.nameNotEmpty': 'Name must not be empty.',
	'err.temperature': 'Temperature must be above -273.15.',
	'err.valueNotInRange': 'Value must be beteen ${0} and ${1}.',
	'estimatedTemperature': 'Estimated temperature',
	'goToHistory': 'Navigate to history.',
	'history': 'History',
	'hours': 'Hours',
	'info.insertedElement': 'Added ${0} \u00D7 ${1}.',
	'info.snapshotRecorded': 'Current state recorded.',
	'info.stopRecording': 'Recording terminated.',
	'heating': 'Heating',
	'lastRecord': 'Last recording',
	'maximum': 'Maximum',
	'minutes': 'Minutes',
	'msg.enterMaxValue': 'Please enter maximum.',
	'msg.enterName': 'Please enter a name.',
	'name': 'Name',
	'newElement': 'New',
	'no': 'No',
	'parameters': 'Parameters',
	'passive': 'Passive',
	'passiveElement': 'Passive element',
	'question': 'Question',
	'question.stopRecording': 'Should the recording be cancelled and the cycle of measurement since ${0} be ignored?',
	'record': 'Record',
	'setting': 'Setting',
	'setup': 'Setup',
	'splash.command': 'Tap to continue...',
	'splash.title': 'The app for heating or cooling support.',
	'startTemperature': 'Starting temperature',
	'startTime': 'Starting time',
	'state': 'State',
	'system': 'System',
	'systems': 'Systems',
	'systems.empty': 'No systems found.',
	'systems.delete.question': 'Should the system be deleted permanently?',
	'targetTemperature': 'Target temperature',
	'temperature': 'Temperature',
	'temperatureUnit': 'Unit for temperature',
	'title': 'Heating',
	'type': 'Type',
	'unit': 'Unit',
	'warn.unableToEditCompletely': 'To edit all parameters, all recordings must be deleted.',
	'yes': 'Yes'
};

@Injectable({
	providedIn: 'root'
})
export class TranslateService {

	private readonly localesByLanguage = new Map<string, Dictionary>();
	private readonly defaultLocales: Dictionary;

	constructor() {
		this.localesByLanguage.set('de', de);
		this.localesByLanguage.set('en', en);
		this.defaultLocales = en;
	}

	get(textId: string, ...params: any[]): string {
		const ret = this.dictionary[textId];
		if (ret === undefined) {
			console.warn(`Text '${textId}' not translated.`);
			return textId;
		} else {
			return params.length > 0 ? this.format(ret, params) : ret;
		}
	}

	private get dictionary(): Dictionary {
		const dict = this.localesByLanguage.get(this.locale);
		return dict !== undefined ? dict : this.defaultLocales;
	}

	private get locale(): string {
		const result = /^([A-Z]+)/gi.exec(navigator.language);
		if (result !== null) {
			return result[1].toLowerCase();
		} else {
			return '';
		}
	}

	private format(text: string, params: any[]): string {
		const pattern = /\$\{([0-9]+)\}/g;
		while (true) {
			const result = pattern.exec(text);
			if (result !== null) {
				const ins = String(params[Number(result[1])]);
				text = text.substring(0, result.index) + ins + text.substring(result.index + result[0].length);
				pattern.lastIndex = result.index + ins.length;
			} else {
				break;
			}
		}
		return text;
	}
}
