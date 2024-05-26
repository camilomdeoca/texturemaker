import { Directive, ElementRef, Input } from '@angular/core';

@Directive({
  selector: '[appCardOutput]',
  standalone: true
})
export class CardOutputDirective {

  @Input()
  appCardOutput: string = '';

  constructor(public elementRef: ElementRef) { }
}
