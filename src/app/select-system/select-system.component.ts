import { Component, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { MessageBoxService } from '../message-box.service';
import { MessageBoxQuestion, MessageBoxResult } from '../message-box';
import { SystemService } from '../system.service';
import { System } from '../system';
import { TranslateService } from '../translate.service';

interface Element {
	id: string;
	title: string;
	active: boolean;
}

@Component({
	selector: 'h-select-system',
	templateUrl: './select-system.component.html',
	styleUrls: ['./select-system.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class SelectSystemComponent {

	elements: Element[] = [];

	selection: string | undefined;

	get canEdit(): boolean {
		return this.selection !== undefined;
	}

	get canStart(): boolean {
		const system = this.system;
		return system !== undefined && system.canStart();
	}

	get empty(): boolean {
		return this.elements.length === 0;
	}

	get system(): System | undefined {
		return this.selection !== undefined ? this.systemService.getSystem(this.selection) : undefined;
	}

	constructor(private readonly router: Router,
		private readonly messageBoxService: MessageBoxService,
		private readonly systemService: SystemService,
		private readonly changeDetectorRef: ChangeDetectorRef,
		private readonly translateService: TranslateService
	) {
		this.updateList();
	}

	onEdit(): void {
		if (this.selection !== undefined) {
			this.router.navigate(['setup', this.selection]);
		}
	}

	onDelete(): void {
		const id = this.selection;
		if (id !== undefined) {
			this.messageBoxService.question(this.translateService.get('systems.delete.question'), MessageBoxQuestion.YES_NO).subscribe({
				next: result => {
					if (result === MessageBoxResult.YES) {
						this.systemService.deleteSystem(id);
						this.selection = undefined;
						this.updateList();
						this.changeDetectorRef.markForCheck();
					}
				}
			});
		}
	}

	onSelect(id: string): void {
		this.selection = id;
	}

	private updateList(): void {
		this.elements = this.systemService.listSystems().map(s => {
			const ret: Element = {
				id: s.id,
				title: s.name,
				active: s.isRecording
			};
			return ret;
		});
		if (this.selection === undefined && this.elements.length > 0) {
			this.selection = this.elements[0].id;
		}
	}
}
