import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Router } from '@angular/router';

@Component({
	selector: 'h-splash',
	templateUrl: './splash.component.html',
	styleUrls: ['./splash.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class SplashComponent {

	constructor(private router: Router) { }
	
	onClick(): void {
		this.router.navigateByUrl('/select-system');
	}
}
