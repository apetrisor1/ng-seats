import { Injectable } from '@angular/core'
import { Matrix } from '../classes/matrix'
import { SVGService } from '.'

/* Provides utility functions for:
Rotate Directive
Droppable Directive

- Sets a new position for a SVG DOM element (a seat)
- Gives pivot point of matrix (to rotate around)
- Obtains the rotational transformation matrix for a given angle,
used to find rotated seat coordinates.

*/

@Injectable({
  providedIn: 'root'
})
export class PositioningService {

  constructor(private svgService: SVGService) { }

  moveSVGElement = (event, element, xDiff = 0, yDiff = 0) => {
    const svgPoint = this.svgService.getSVGPoint(event, element)
    this.setPosition(element, { x: svgPoint.x + xDiff, y: svgPoint.y + yDiff})
  }

  setPosition(element, coord: { x, y }) {
    element.setAttribute('cx', coord.x)
    element.setAttribute('cy', coord.y)
  }

  getAngleInRadians = (angleInDegrees: number) => ((angleInDegrees * Math.PI) / 180)

  getPivotPointOfMatrix = (seats) => {
    let minX: any = seats[0].cx.baseVal.value
    let maxX: any = minX
    let minY: any = seats[0].cy.baseVal.value
    let maxY: any = minY
    for (let i = 1; i < seats.length; i++) {
        const { cx, cy } = seats[i]
        const x = cx.baseVal.value
        const y = cy.baseVal.value
        if (x < minX) { minX = x }
        if (x > maxX) { maxX = x }
        if (y < minY) { minY = y }
        if (x > maxY) { maxY = y }
    }
    const pivotX = (minX + maxX) / 2
    const pivotY = (minY + maxY) / 2

    return { x: pivotX, y: pivotY }
  }

  obtainTransformationMatrix = (degrees: number) => {
    const angleInRadians = this.getAngleInRadians(degrees)
    return new Matrix(
      [Math.cos(angleInRadians), -Math.sin(angleInRadians)],
      [Math.sin(angleInRadians), Math.cos(angleInRadians)]
    )
  }
}
