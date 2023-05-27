import { Injectable } from '@angular/core';

export interface Message {
	message: string;
	icon: string;
	color: string;
}

@Injectable({
	providedIn: 'root'
})
export class ToastService {

	private _messages: Message[] = [];

	get messages(): Message[] {
		return this._messages.slice(0);
	}

	constructor() { }

	error(err: string | Error): void {
		if (typeof err === 'string') {
			this._messages.push({
				message: err,
				icon: 'exclamation',
				color: 'danger'
			});
		} else {
			this._messages.push({
				message: err.message,
				icon: 'exclamation',
				color: 'danger'
			});
		}
	}

	info(message: string): void {
		this._messages.push({
			message: message,
			icon: 'info',
			color: 'info'
		});
	}

	hideInfo(index: number): void {
		this._messages.splice(index, 1);
	}
}
