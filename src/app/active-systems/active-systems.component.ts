import { Component, ChangeDetectionStrategy } from '@angular/core';
import { SystemService } from '../system.service';

interface Element {
	id: string;
	title: string;
	subtitle: string;
}

@Component({
	selector: 'h-active-systems',
	templateUrl: './active-systems.component.html',
	styleUrls: ['./active-systems.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class ActiveSystemsComponent {

	elements: Element[] = [];

	get empty(): boolean {
		return this.elements.length === 0;
	}

	constructor(private readonly systemService: SystemService) {
		this.updateList();
	}

	private updateList(): void {
		this.elements = this.systemService.listActiveSystems().map(s => {
			
			const ret: Element = {
				id: s.id,
				title: s.name,
				subtitle: `${s.lastRecordingTime !== undefined ? s.lastRecordingTime.toLocaleDateString() : ''}`
			};
			return ret;
		});
	}
}
