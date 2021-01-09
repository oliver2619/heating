import { Component, ChangeDetectionStrategy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SystemService } from '../system.service';

@Component({
	selector: 'h-setup',
	templateUrl: './setup.component.html',
	styleUrls: ['./setup.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class SetupComponent {

	readonly id: string;

	get title(): string {
		const system = this.systemService.getSystem(this.id);
		return system !== undefined ? system.name : '';
	}

	constructor(private readonly systemService: SystemService, activatedRoute: ActivatedRoute) {
		this.id = activatedRoute.snapshot.params['id'];
	}
}
