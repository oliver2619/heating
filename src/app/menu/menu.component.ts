import { Component, Input, ChangeDetectionStrategy } from '@angular/core';

@Component({
	selector: 'h-menu',
	templateUrl: './menu.component.html',
	styleUrls: ['./menu.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class MenuComponent {

	@Input('title')
	title: string = '';

	constructor() { }
}
