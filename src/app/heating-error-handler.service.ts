import { Injectable, ErrorHandler } from '@angular/core';
import { ToastService } from './toast.service';

@Injectable({
	providedIn: 'root'
})
export class HeatingErrorHandlerService implements ErrorHandler {

	constructor(private readonly toastService: ToastService) { }

	handleError(error: any): void {
		this.toastService.error(error);
		console.error(error);
	}
}
