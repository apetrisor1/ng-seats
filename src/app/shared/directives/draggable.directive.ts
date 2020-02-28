import { Directive, ElementRef, HostListener } from '@angular/core'
import { MULTI, SINGLE } from '../CONSTANTS'

@Directive({
  selector: '[appDraggable]'
})
export class DraggableDirective {
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
    let text = `${MULTI}|${target.id}`
    const circles = target.getElementsByTagName('circle')
    for (const circle of circles) {
      text += `_${circle.id}`
    }
    dataTransfer.setData('text', text)
  }

  private handleSingleDrag({ target, dataTransfer }): void {
    const elementToBeDragged = target.getElementsByTagName('circle')[0]
    dataTransfer.setData('text', `${SINGLE}|${elementToBeDragged.id}`)
  }
}
