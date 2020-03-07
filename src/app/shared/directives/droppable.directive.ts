import { Directive, HostListener } from '@angular/core'
import { SVGService } from '../services/svgservice.service'
import { GroupingService } from '../services/grouping.service'

@Directive({
  selector: '[appDroppable]'
})
export class DroppableDirective {
  private draggingElement: any

  constructor(private svgService: SVGService, private grouping: GroupingService) {
  }

  @HostListener('drop', ['$event'])
  onDrop(event) {
    const text = event.dataTransfer.getData('text')
    const data = [...text.split('_')]
    const MULTI = data.length > 1

    MULTI ? this.multiDrop(data, event) : this.drop(data, event)
}

  @HostListener('mousemove', ['$event'])
  onMouseMove(event): void {
    if (this.draggingElement) {
      const svgPoint = this.svgService.getSVGPoint(event, this.draggingElement)
      this.setPosition(this.draggingElement, { x: svgPoint.x, y: svgPoint.y })
    }
  }

  @HostListener('mousedown', ['$event'])
  onMouseDown(event): void {
    if (event.target.getAttribute('draggable')) {
      console.log({ target: event.target })
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

  private drop = (elementId, event, xDiff = 0, yDiff = 0) => {
    const droppedElement = document.getElementById(elementId)?.cloneNode(true) as any
    const original = document.getElementById(elementId)
    original?.remove()

    event.target.appendChild(droppedElement)
    droppedElement.setAttribute('draggable', true)

    const svgPoint = this.svgService.getSVGPoint(event, droppedElement)
    this.setPosition(droppedElement, { x: svgPoint.x + xDiff, y: svgPoint.y + yDiff })
  }

  private multiDrop = (multiData, event) => {
    let i: number
    let x: number | undefined
    let y: number | undefined

    const len = multiData.length
    const original = document.getElementById(multiData[0])
    const originalBoundingBox = original?.getBoundingClientRect()
    x = originalBoundingBox?.x
    y = originalBoundingBox?.y
    this.drop(original?.id, event)

    /* ignore last (see draggable.directive) */
    for (i = 1; i < len - 1; i ++) {
      const id = multiData[i]
      const follower = document.getElementById(id)
      if (follower) {
        const boundingBox = follower?.getBoundingClientRect()
        const xF = boundingBox.x
        const yF = boundingBox.y
        const xOffset = xF - (x || 0)
        const yOffset = yF - (y || 0)
        this.drop(id, event, xOffset, yOffset)
      }
    }
  }

  private setPosition(element, coord: { x, y }) {
    element.setAttribute('cx', coord.x)
    element.setAttribute('cy', coord.y)
  }
}
