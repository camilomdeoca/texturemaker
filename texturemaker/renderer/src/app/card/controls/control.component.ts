import { Directive, Input } from "@angular/core";

@Directive()
export abstract class CardControl {
  @Input()
  changeCallback: (() => void) | undefined = undefined;
}
