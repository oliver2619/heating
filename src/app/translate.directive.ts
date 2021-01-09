import { Directive, Input, ElementRef, OnInit } from '@angular/core';
import { TranslateService } from './translate.service';

@Directive({
	selector: '[hTranslate]'
})
export class TranslateDirective implements OnInit {

	@Input('hTranslate')
	input: string | undefined;

	constructor(private readonly elementRef: ElementRef<HTMLElement>, private readonly translateService: TranslateService) { }

	ngOnInit(): void {
		if (this.input !== undefined) {
			const text = this.translateService.get(this.input);
			this.elementRef.nativeElement.innerText = text;
		}
	}
}
