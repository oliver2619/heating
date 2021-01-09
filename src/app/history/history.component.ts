import { Component, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { SystemService } from '../system.service';
import { MessageBoxService } from '../message-box.service';
import { TranslateService } from '../translate.service';
import { ActivatedRoute, Router } from '@angular/router';
import { System } from '../system';
import { MessageBoxResult, MessageBoxQuestion } from '../message-box';

interface Element {
	id: string;
	title: string;
	amount: number;
	startTime: Date;
	startTemperature: number;
	endTemperature: number;
	selected: boolean;
}

@Component({
	selector: 'h-history',
	templateUrl: './history.component.html',
	styleUrls: ['./history.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class HistoryComponent {

	elements: Element[] = [];

	readonly id: string | undefined;

	get canEdit(): boolean {
		return this.elements.filter(e => e.selected).length === 1;
	}

	get canRemove(): boolean {
		return this.elements.filter(e => e.selected).length > 0;
	}

	get title(): string {
		const s = this.getSystem();
		return s !== undefined ? s.name : '';
	}

	constructor(
		private readonly systemService: SystemService,
		private readonly messageBoxService: MessageBoxService,
		private readonly changeDetectorRef: ChangeDetectorRef,
		private readonly translateService: TranslateService,
		private readonly router: Router,
		activatedRoute: ActivatedRoute
	) {
		this.id = activatedRoute.parent !== null ? activatedRoute.snapshot.params['id'] : undefined;
		this.updateElements();
	}

	onEdit(): void {
		const f = this.elements.find(e => e.selected);
		if (f !== undefined) {
			this.router.navigate(['recording', this.id, f.id]);
		}
	}

	onRemove(): void {
		const system = this.getSystem();
		const ids = this.elements.filter(e => e.selected).map(e => e.id);
		if (system !== undefined) {
			this.messageBoxService.question(this.translateService.get('elements.delete.question'), MessageBoxQuestion.YES_NO).subscribe({
				next: result => {
					if (result === MessageBoxResult.YES) {
						ids.forEach(id => this.systemService.deleteHistoryElement(system, id));
						this.updateElements();
						this.changeDetectorRef.markForCheck();
					}
				}
			});
		}
	}

	onSelect(index: number): void {
		const el = this.elements[index]
		el.selected = !el.selected;
	}

	onSelectAll(flag: boolean): void {
		this.elements.forEach(e => e.selected = flag);
	}

	private getSystem(): System | undefined {
		return this.id !== undefined ? this.systemService.getSystem(this.id) : undefined;
	}

	private updateElements(): void {
		const system = this.getSystem();
		if (system !== undefined) {
			this.elements = system.history.map(e => {
				const ret: Element = {
					id: e.id,
					title: `${e.startTime.toLocaleDateString()} ${e.startTime.toLocaleTimeString()} - ${e.endTime.toLocaleTimeString()}`,
					amount: e.amount,
					startTime: e.startTime,
					startTemperature: e.startTemperature,
					endTemperature: e.endTemperature,
					selected: false
				};
				return ret;
			});
			this.elements.sort((e1, e2) => e1.startTime.getTime() - e2.startTime.getTime());
		}
	}
}
