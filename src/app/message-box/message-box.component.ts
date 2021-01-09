import { Component, Input, EventEmitter, Output, ChangeDetectionStrategy } from '@angular/core';
import { MessageBoxResult, MessageBoxQuestion } from '../message-box';

@Component({
	selector: 'h-message-box',
	templateUrl: './message-box.component.html',
	styleUrls: ['./message-box.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class MessageBoxComponent {

	@Input('message')
	message: string = '';

	@Input('question')
	question: MessageBoxQuestion | undefined

	@Output('close')
	onClose = new EventEmitter<MessageBoxResult>();

	get cancelVisible(): boolean {
		return this.question === MessageBoxQuestion.YES_NO_CANCEL;
	}

	onYes(): void {
		this.onClose.emit(MessageBoxResult.YES);
	}

	onNo(): void {
		this.onClose.emit(MessageBoxResult.NO);
	}

	onCancel(): void {
		this.onClose.emit(MessageBoxResult.CANCEL);
	}
}
