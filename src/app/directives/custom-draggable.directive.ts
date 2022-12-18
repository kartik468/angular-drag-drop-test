import {
  Directive,
  ElementRef,
  HostListener,
  NgZone,
  Renderer2,
} from '@angular/core';

@Directive({
  selector: '[appCustomDraggable]',
})
export class CustomDraggableDirective {
  constructor(
    private elementRef: ElementRef,
    private renderer: Renderer2,
    private ngZone: NgZone
  ) {}

  internalDNDType = 'text';
  cloneEl!: HTMLDivElement;

  target!: HTMLDivElement;

  @HostListener('drag', ['$event'])
  onDrag(event: DragEvent): boolean {
    console.log('onDrag', event);

    if (this.cloneEl && this.target) {
      this.positionElement(this.cloneEl, {
        top: event.pageY,
        left: event.pageX,
      });
    }
    return true;
  }

  @HostListener('dragstart', ['$event'])
  onDragStart(event: DragEvent): boolean {
    this.target = event.target as HTMLDivElement;
    event.dataTransfer?.setData(
      this.internalDNDType,
      (this.target as any).dataset.value
    );
    (event.dataTransfer as any).effectAllowed = 'move'; // only allow moves

    this.cloneElement(this.target);

    return true;
  }

  @HostListener('dragend', ['$event'])
  onDragEnd(event: DragEvent): boolean {
    this.removeClonedElement();
    return true;
  }

  cloneElement(target: HTMLDivElement) {
    this.cloneEl = (target as HTMLDivElement).cloneNode(true) as any;
    this.cloneEl.id = this.cloneEl.id + '_clone';
    this.cloneEl.style.position = 'fixed';
    console.log(this.cloneEl);

    const rect = target.getBoundingClientRect();

    // this.positionElement(this.cloneEl, rect);

    document.body.appendChild(this.cloneEl);
  }

  positionElement(
    cloneEl: HTMLElement,
    position: { top: number; left: number }
  ) {
    cloneEl.style.left = position.left + 'px';
    cloneEl.style.top = position.top + 'px';
  }

  removeClonedElement() {
    document.body.removeChild(this.cloneEl);
  }
}
