import { Directive, ElementRef, HostListener } from '@angular/core'

/*

CLEAN UP

*/
@Directive({
  selector: '[appDraggable]'
})
export class DraggableDirective {
  constructor(private el: ElementRef) {
    this.el.nativeElement.setAttribute('draggable', true)
  }

  @HostListener('dragstart', ['$event'])
  onDragStart(event) {
    const { target, dataTransfer } = event

    const elementToBeDragged = target.getElementsByTagName('circle')[0]
    dataTransfer.setData('text', elementToBeDragged.id)
    this.handleSingleDrag(event)
    // event.target.parentNode.parentNode.getElementsByTagName('circle').length > 1 ?
    //   this.handleMultiDrag(event)
    //   : this.handleSingleDrag(event)
  }

  @HostListener('document:dragover', ['$event'])
  onDragOver(event) {
      if (event.target.id === 'dropzone') {
        event.preventDefault()
      }
  }

  private handleMultiDrag({ target, dataTransfer }): void {
    // TODO
  }

  private handleSingleDrag({ target, dataTransfer }): void {
    const elementToBeDragged = target.getElementsByTagName('circle')[0]
    dataTransfer.setData('text', elementToBeDragged.id)
  }
}
