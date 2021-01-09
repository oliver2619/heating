import { Component, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { SystemService } from '../system.service';
import { ActivatedRoute, Router } from '@angular/router';
import { System } from '../system';
import { MessageBoxService } from '../message-box.service';
import { MessageBoxQuestion, MessageBoxResult } from '../message-box';
import { TranslateService } from '../translate.service';

interface Element {
	id: string;
	title: string;
}

@Component({
	selector: 'h-active-elements',
	templateUrl: './active-elements.component.html',
	styleUrls: ['./active-elements.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class ActiveElementsComponent {

	elements: Element[] = [];

	selection: string | undefined;

	readonly id: string | undefined;

	get canEdit(): boolean {
		return this.selection !== undefined;
	}

	get canEditSystem(): boolean {
		const system = this.getSystem();
		return system !== undefined && system.canEdit;
	}

	constructor(private readonly systemService: SystemService,
		private readonly router: Router,
		private readonly messageBoxService: MessageBoxService,
		private readonly changeDetectorRef: ChangeDetectorRef,
		private readonly translateService: TranslateService,
		activatedRoute: ActivatedRoute
	) {
		this.id = activatedRoute.parent !== null ? activatedRoute.parent.snapshot.params['id'] : undefined;
		this.updateElements();
	}

	onAdd(): void {
		const system = this.getSystem();
		if (system !== undefined) {
			const el = this.systemService.addActiveElement(this.translateService.get('newElement'), system);
			this.router.navigate(['setup', this.id, 'active', el.id]);
		}
	}

	onEdit(): void {
		if (this.selection !== undefined) {
			this.router.navigate(['setup', this.id, 'active', this.selection]);
		}
	}

	onRemove(): void {
		const system = this.getSystem();
		const sel = this.selection;
		if (system !== undefined && sel !== undefined) {
			this.messageBoxService.question(this.translateService.get('elements.delete.question'), MessageBoxQuestion.YES_NO).subscribe({
				next: result => {
					if (result === MessageBoxResult.YES) {
						this.systemService.deleteActiveElement(system, sel);
						this.selection = undefined;
						this.updateElements();
						this.changeDetectorRef.markForCheck();
					}
				}
			});
		}
	}

	onSelect(id: string): void {
		this.selection = id;
	}

	private getSystem(): System | undefined {
		return this.id !== undefined ? this.systemService.getSystem(this.id) : undefined;
	}

	private updateElements(): void {
		const system = this.getSystem();
		if (system !== undefined) {
			this.elements = system.activeElements.map(e => {
				const ret: Element = {
					id: e.id,
					title: e.name
				};
				return ret;
			});
			if (this.selection === undefined && this.elements.length > 0) {
				this.selection = this.elements[0].id;
			}
		}
	}
}
