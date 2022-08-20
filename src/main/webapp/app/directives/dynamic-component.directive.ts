import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[jhiDynamicComponent]',
})
export class DynamicComponentDirective {
  constructor(public viewContainerRef: ViewContainerRef) {}
}
