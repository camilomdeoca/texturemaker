import { Directive, ElementRef, Input } from '@angular/core';

@Directive({
  selector: '[appCardInput]',
  standalone: true
})
export class CardInputDirective {

  @Input()
  appCardInput: string = '';

  constructor(public elementRef: ElementRef) { }
}
