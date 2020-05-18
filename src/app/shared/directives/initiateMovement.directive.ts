import { Directive, ElementRef, HostListener } from '@angular/core'

/*
  event.dataTransfer.setData('text', ...) uses format
  One seat: <circle id>
  Multiple: <circle1 id>_...<circleN id>
*/
@Directive({
  selector: '[appInitiateMovement]'
})
export class InitiateMovementDirective {
  constructor(private el: ElementRef) {
    this.el.nativeElement.setAttribute('draggable', true)
  }

  @HostListener('dragstart', ['$event'])
  onDragStart(event) {
    const { target } = event
    const multiDrag = target.getElementsByTagName('circle').length > 1

    multiDrag ?
      this.handleMultiDrag(event)
      : this.handleSingleDrag(event)
  }

  @HostListener('document:dragover', ['$event'])
  onDragOver(event) {
      if (event.target.id === 'dropzone') {
        event.preventDefault()
      }
  }

  private handleMultiDrag({ target, dataTransfer }): void {
    let text = ``
    const circles = target.getElementsByTagName('circle')
    for (const circle of circles) {
      text += `${circle.id}_`
    }
    text = text.slice(0, text.length - 1)
    dataTransfer.setData('text', text)
  }

  private handleSingleDrag({ target, dataTransfer }): void {
    const elementToBeDragged = target.getElementsByTagName('circle')[0]
    dataTransfer.setData('text', elementToBeDragged.id)
  }
}
