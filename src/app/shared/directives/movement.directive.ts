import { Directive, HostListener } from '@angular/core'
import { MultiSelectService, SVGService } from '../services'

/* ini  - Used in initial movement (new seats)  |  main - Used in main area (existing seats) */

@Directive({
  selector: '[appMovement]'
})
export class MovementDirective {
  private draggingElement: any
  private multiDraggingElements: any[] = []
  private stageAreaMultiDrag = false

  constructor(private svgService: SVGService, private multiSelect: MultiSelectService) {
    this.multiSelect.multiDragEvent.subscribe(() => {
      this.stageAreaMultiDrag = !this.stageAreaMultiDrag
    })
    this.multiSelect.selectionDeletedEvent.subscribe(() => this.multiDraggingElements = [])
  }
  // ini
  @HostListener('drop', ['$event'])
  onDrop(event) {
    const text = event.dataTransfer.getData('text')
    const data = [...text.split('_')]
    const multi = data.length > 1
    multi ? this.multiDrop(data, event) : this.drop(data, event)
}
  // main
  @HostListener('mousemove', ['$event'])
  onMouseMove(event): void {
    if (!this.stageAreaMultiDrag && this.draggingElement) {
      this.moveSVGElement(event, this.draggingElement)
    } else if (this.stageAreaMultiDrag && this.multiDraggingElements.length) {
      const original = this.multiDraggingElements[0]
      const originalBoundingBox = original?.getBoundingClientRect()
      const x = originalBoundingBox?.x
      const y = originalBoundingBox?.y
      this.moveSVGElement(event, original)
      let i
      const len = this.multiDraggingElements.length
      for (i = 1; i < len; i ++) {
        const follower = this.multiDraggingElements[i]
        if (follower) {
          const boundingBox = follower?.getBoundingClientRect()
          const xF = boundingBox.x
          const yF = boundingBox.y
          const xOffset = xF - (x || 0)
          const yOffset = yF - (y || 0)
          this.moveSVGElement(event, follower, xOffset, yOffset)
        }
      }
    }
  }

  private moveSVGElement = (event, element, xDiff = 0, yDiff = 0) => {
    const svgPoint = this.svgService.getSVGPoint(event, element)
    this.setPosition(element, { x: svgPoint.x + xDiff, y: svgPoint.y + yDiff})
  }

  @HostListener('mousedown', ['$event'])
  onMouseDown(event): void {
    // main
    if (!this.stageAreaMultiDrag) {
      if (event.target.getAttribute('draggable')) {
        this.draggingElement = event.target
      }
    } else {
      const text = this.multiSelect.getSelection()
      if (text) {
        const data = [...text.split('_')]
        data.map((id) => this.multiDraggingElements.push(document.getElementById(id)))
      }
    }
  }

  @HostListener('mouseup', ['$event'])
  onMouseUp(event): void {
    this.draggingElement = null
    this.multiDraggingElements = []
  }

  @HostListener('mouseleave', ['$event'])
  onMouseLeave(event): void {
    this.draggingElement = null
    this.multiDraggingElements = []
  }

  // ini
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

    for (i = 1; i < len; i ++) {
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
