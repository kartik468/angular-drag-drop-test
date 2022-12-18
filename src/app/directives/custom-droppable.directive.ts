import {
  Directive,
  ElementRef,
  HostListener,
  NgZone,
  Renderer2,
} from '@angular/core';

@Directive({
  selector: '[appCustomDroppable]',
})
export class CustomDroppableDirective {
  constructor(
    private ngZone: NgZone,
    private elementRef: ElementRef,
    private renderer: Renderer2
  ) {}

  internalDNDType = 'text';

  @HostListener('dragenter', ['$event'])
  ondragenter(event: DragEvent): boolean {
    // console.log(`CustomDroppableDirective -> ondragenter -> event`, event);
    this.showData(event);
    event.preventDefault();
    return true;
  }

  showData(event: DragEvent) {
    const data = event.dataTransfer?.getData(this.internalDNDType);
    console.log('event', event.type, data);
  }

  @HostListener('dragover', ['$event'])
  ondragover(event: DragEvent): boolean {
    // console.log(`CustomDroppableDirective -> ondragover -> event`, event);
    this.showData(event);
    event.preventDefault();
    return true;
  }

  @HostListener('dragleave', ['$event'])
  ondragleave(event: DragEvent): boolean {
    // console.log(`CustomDroppableDirective -> ondragleave -> event`, event);
    this.showData(event);

    event.preventDefault();
    return true;
  }

  @HostListener('drop', ['$event'])
  ondrop(event: DragEvent): boolean {
    // console.log(`CustomDroppableDirective -> ondrop -> event`, event);
    this.showData(event);
    event.preventDefault();
    return true;
  }
}
