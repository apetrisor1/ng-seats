import { Directive, HostListener } from '@angular/core'
import { SVGService } from '../services/svgservice.service'

/*

CLEAN UP

*/
@Directive({
  selector: '[appDroppable]'
})
export class DroppableDirective {
  private draggingElement: any

  constructor(private svgService: SVGService) {
  }

  @HostListener('drop', ['$event'])
  onDrop(event) {
    const droppedElementId = event.dataTransfer.getData('text')
    this.drop(droppedElementId, event)
  }

  @HostListener('mousemove', ['$event'])
  onMouseMove(event): void {
    if (this.draggingElement) {
      const svgPoint = this.svgService.getSVGPoint(event, this.draggingElement)
      this.setPosition(this.draggingElement, { x: svgPoint.x, y: svgPoint.y  })
    }
  }

  @HostListener('mousedown', ['$event'])
  onMouseDown(event): void {
    if (event.target.getAttribute('draggable')) {
      this.draggingElement = event.target
    }
  }

  @HostListener('mouseup', ['$event'])
  onMouseUp(event): void {
    this.draggingElement = null
  }

  @HostListener('mouseleave', ['$event'])
  onMouseLeave(event): void {
    this.draggingElement = null
  }

  private setPosition(element, coord: { x, y }) {
    element.setAttribute('cx', coord.x)
    element.setAttribute('cy', coord.y)
  }

  private drop = (elementId, event) => {
    const droppedElement = document.getElementById(elementId)?.cloneNode(true) as any
    const original = document.getElementById(elementId)
    original?.remove()

    event.target.appendChild(droppedElement)
    droppedElement.setAttribute('draggable', true)

    const svgPoint = this.svgService.getSVGPoint(event, droppedElement)
    this.setPosition(droppedElement, { x: svgPoint.x, y: svgPoint.y })
  }
}
