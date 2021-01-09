import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { MessageBoxComponent } from './message-box/message-box.component';
import { MessageBoxQuestion, MessageBoxResult } from './message-box';

export interface Message {
	message: string;
}

@Injectable({
	providedIn: 'root'
})
export class MessageBoxService {

	private _messages: Message[] = [];

	get messages(): Message[] {
		return this._messages.slice(0);
	}

	constructor(private readonly modalService: NgbModal) { }

	info(message: string): void {
		this._messages.push({
			message: message
		});
	}

	hideInfo(index: number): void {
		this._messages.splice(index, 1);
	}

	question(message: string, question: MessageBoxQuestion): Observable<MessageBoxResult> {
		const modal = this.modalService.open(MessageBoxComponent, {
			backdrop: true,
			centered: true
		});
		const inst = <MessageBoxComponent>modal.componentInstance;
		const ret = new Subject<MessageBoxResult>();
		inst.message = message;
		inst.question = question;
		inst.onClose.subscribe({
			next: (result: MessageBoxResult) => {
				modal.dismiss();
				ret.next(result);
			}
		})
		return ret;
	}
}
