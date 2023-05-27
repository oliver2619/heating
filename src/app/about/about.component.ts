import { Component, ChangeDetectionStrategy } from '@angular/core';
import packageJson from '../../../package.json';

@Component({
	selector: 'h-about',
	templateUrl: './about.component.html',
	styleUrls: ['./about.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class AboutComponent {

	readonly version: string;
	
	constructor() { 
		this.version = packageJson.version;
	}
}
