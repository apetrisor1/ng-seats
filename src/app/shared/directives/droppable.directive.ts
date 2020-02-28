import { Directive, HostListener } from '@angular/core'
import { SVGService } from '../services/svgservice.service'
import { GroupingService } from '../services/grouping.service'
import { MULTI, SINGLE } from '../CONSTANTS'

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
    const [type, data] = text.split('|')

    switch (type) {
      case SINGLE:
        this.drop(data, event)
        break
      case MULTI:
        const [divId, ...multiData] = data.split('_')
        this.multiDrop(divId, multiData, event)
        break
    }
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

  private drop = (elementId, event, xDiff = 0, yDiff = 0) => {
    const droppedElement = document.getElementById(elementId)?.cloneNode(true) as any
    const original = document.getElementById(elementId)
    original?.remove()

    event.target.appendChild(droppedElement)
    droppedElement.setAttribute('draggable', true)

    const svgPoint = this.svgService.getSVGPoint(event, droppedElement)
    this.setPosition(droppedElement, { x: svgPoint.x + xDiff, y: svgPoint.y + yDiff})
  }

  private multiDrop = (divId, multiData, event) => {
    const div = document.getElementById(divId)
    let divbox: any
    let i: number
    let x: any
    let y: any

    divbox = div?.getBoundingClientRect()

    const len = multiData.length
    const original = document.getElementById(multiData[0])
    const originalBoundingBox = original?.getBoundingClientRect()
    x = originalBoundingBox?.x
    y = originalBoundingBox?.y
    this.drop(original?.id, event)

    for (i = 1; i < len; i++) {
      const id = multiData[i]
      const follower = document.getElementById(id)
      if (follower) {
        const boundingBox = follower?.getBoundingClientRect()
        const xF = boundingBox.x
        const yF = boundingBox.y
        const xOffset = xF - x
        const yOffset = yF - y
        this.drop(id, event, xOffset, yOffset)
      }
    }
  }
}
