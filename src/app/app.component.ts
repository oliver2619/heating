import { Component } from '@angular/core';
import { TranslateService } from './translate.service';
import { ToastService, Message } from './toast.service';

@Component({
	selector: 'h-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss']
})
export class AppComponent {

	get messages(): Message[] {
		return this.toastService.messages;
	}

	constructor(private toastService: ToastService, translateService: TranslateService) {
		document.title = translateService.get('title');
	}
	
	hideMessage(index: number): void {
		this.toastService.hideInfo(index);
	}
}
