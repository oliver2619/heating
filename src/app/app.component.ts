import { Component } from '@angular/core';
import { TranslateService } from './translate.service';
import { MessageBoxService, Message } from './message-box.service';

@Component({
	selector: 'h-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss']
})
export class AppComponent {

	get messages(): Message[] {
		return this.messageBoxService.messages;
	}

	constructor(private messageBoxService: MessageBoxService, translateService: TranslateService) {
		document.title = translateService.get('title');
	}
	
	hideMessage(index: number): void {
		this.messageBoxService.hideInfo(index);
	}
}
