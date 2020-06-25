import { Directive, OnInit, Input, ViewContainerRef, TemplateRef } from '@angular/core';

@Directive({
  selector: '[myFor]'
})
export class ForDirective implements OnInit {

  @Input('myForEm') operacoes: string[]

  constructor(private container: ViewContainerRef, private template: TemplateRef<any>) {    
  }

  ngOnInit(): void {
    for (let operacao of this.operacoes) {
      this.container.createEmbeddedView(this.template, { $implicit: operacao})
    }
  }

}
