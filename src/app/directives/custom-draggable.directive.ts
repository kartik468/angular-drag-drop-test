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

  offset!: { left: number; top: number };
  internalDNDType = 'text';
  cloneEl!: HTMLDivElement;

  target!: HTMLDivElement;

  // @HostListener('drag', ['$event'])
  // onDrag(event: DragEvent): boolean {
  //   console.log('onDrag', event);

  //   if (this.cloneEl && this.target) {
  //     this.positionElement(this.cloneEl, {
  //       top: event.pageY,
  //       left: event.pageX,
  //     });
  //   }
  //   return true;
  // }

  // @HostListener('dragstart', ['$event'])
  // onDragStart(event: DragEvent): boolean {
  //   this.target = event.target as HTMLDivElement;
  //   event.dataTransfer?.setData(
  //     this.internalDNDType,
  //     (this.target as any).dataset.value
  //   );
  //   (event.dataTransfer as any).effectAllowed = 'move'; // only allow moves

  //   this.cloneElement(this.target);

  //   return true;
  // }

  // @HostListener('dragend', ['$event'])
  // onDragEnd(event: DragEvent): boolean {
  //   this.removeClonedElement();
  //   return true;
  // }

  startDragging = false;

  @HostListener('mousedown', ['$event'])
  onMouseDown(event: MouseEvent) {
    console.log('mousedown', event);
    this.startDragging = true;
    // this.offset = this.calculateOffset(
    //   event.currentTarget as HTMLElement,
    //   event
    // );
    // console.log(this.offset);

    this.cloneElement(event.currentTarget as any);
    this.positionElement(this.cloneEl, { top: event.pageY, left: event.pageX });
  }

  @HostListener('document:mousemove', ['$event'])
  onMouseMove(event: any) {
    if (this.startDragging) {
      this.positionElement(this.cloneEl, {
        top: event.pageY,
        left: event.pageX,
      });
    }
  }

  @HostListener('document:mouseup', ['$event'])
  onMouseUp(event: any) {
    if (this.startDragging) {
      this.startDragging = false;
      console.log('mouseup', event);
      this.removeClonedElement();
    }
  }


  @HostListener('mousemove', ['$event'])
  onTargetMouseMove(event: MouseEvent) {
    console.log(event.currentTarget)
  }

  calculateOffset(currentTarget: HTMLElement, event: MouseEvent) {
    // reduce margins from current Target
    // getComputedStyle(currentTarget).marginTop;
    // for now just subtracting 10
    const marginX = 10;
    const marginY = 10;
    const rect = currentTarget.getBoundingClientRect();
    return {
      left: event.pageX - (rect.x - marginX),
      top: event.pageY - (rect.y - marginY),
    };
  }

  cloneElement(target: HTMLDivElement) {
    this.cloneEl = (target as HTMLDivElement).cloneNode(true) as any;
    this.cloneEl.id = this.cloneEl.id + '_clone';
    this.cloneEl.style.position = 'fixed';
    this.cloneEl.style.zIndex = '1000';

    document.body.appendChild(this.cloneEl);
  }

  positionElement(
    cloneEl: HTMLElement,
    position: { top: number; left: number }
  ) {
    if (!cloneEl) {
      return;
    }
    if (!this.offset) {
      this.offset = {
        top: 0,
        left: 0,
      };
    }
    cloneEl.style.left = position.left - this.offset.left + 'px';
    cloneEl.style.top = position.top - this.offset.top + 'px';
  }

  removeClonedElement() {
    if (this.cloneEl) {
      document.body.removeChild(this.cloneEl);
      this.cloneEl = undefined as any;
    }
  }
}
