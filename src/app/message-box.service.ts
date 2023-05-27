import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { MessageBoxComponent } from './message-box/message-box.component';
import { MessageBoxQuestion, MessageBoxResult } from './message-box';

@Injectable({
	providedIn: 'root'
})
export class MessageBoxService {

	constructor(private readonly modalService: NgbModal) { }

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
