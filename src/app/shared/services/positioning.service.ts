import { Injectable } from '@angular/core'
import { Matrix } from '../classes/matrix'
import { SVGService } from '.'

/* Provides utility functions for:
Rotate Directive
Droppable Directive
*/

@Injectable({
  providedIn: 'root'
})
export class PositioningService {

  constructor(private svgService: SVGService) { }

  getAngleInRadians = (angleInDegrees: number) => ((angleInDegrees * Math.PI) / 180)

  getRelativeCoordsMatrix = (seats) => {
    const pivotPoint = this.getMatrixPivotPoint(seats)
    const matrix = new Matrix([], [])
    seats.forEach(seat => {
        const { cx, cy } = seat
        matrix.rows[0].push(cx.baseVal.value - pivotPoint.x)
        matrix.rows[1].push(cy.baseVal.value - pivotPoint.y)
    })

    return matrix
  }

  getAbsoluteCoordsMatrix = (seats) => {
    const matrix = new Matrix([], [])
    seats.forEach(seat => {
        const { cx, cy } = seat
        matrix.rows[0].push(cx.baseVal.value)
        matrix.rows[1].push(cy.baseVal.value)
    })

    return matrix
  }

  getMatrixPivotPoint = (seats) => {
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
        if (y > maxY) { maxY = y }
    }
    const pivotX = (minX + maxX) / 2
    const pivotY = (minY + maxY) / 2

    return { x: pivotX, y: pivotY }
  }

  moveSVGElement = (event, element, xDiff = 0, yDiff = 0) => {
    const svgPoint = this.svgService.getSVGPoint(event, element)
    this.setPosition(element, { x: svgPoint.x + xDiff, y: svgPoint.y + yDiff})
  }

  multiply2x2Matrices = (matrix1: Matrix, matrix2: Matrix) => {
    const matrix = new Matrix([], [])
    matrix1.columns().forEach(seat => {
      const rotatedX = (seat[0] * matrix2.rows[0][0]) + (seat[1] * matrix2.rows[0][1])
      const rotatedY = (seat[0] * matrix2.rows[1][0]) + (seat[1] * matrix2.rows[1][1])
      matrix.rows[0].push(rotatedX)
      matrix.rows[1].push(rotatedY)
    })
    return matrix
  }

  /*P, M and Q are three collinear points and PM = MQ.
  Given P (x1, y1) and M (x2, y2), find out Q (x3, y3) as follows:
  (x3 + x1) / 2 === x2 results in x3 = 2*x2 - x1
  (y3 + y1) / 2 === y2 results in y3 = 2*y2 - y1
  */
  obtainThirdPointOnLine = ([x1, y1], [x2, y2]) => ({ x: (2 * x2) - x1, y: (2 * y2) - y1 })

  /*P, M and Q are three collinear points and PM = MQ.
  Given P (x1, y1) and Q (x2, y2), find out M (x3, y3) as follows:
  x3 = x1 + x2 / 2
  y3 = y1 + y2 / 2
  */
  obtainMiddlePointOnLine = ([x1, y1], [x2, y2]) => ({ x: (x1 + x2) / 2, y: (y1 + y2) / 2 })

  obtainTransformationMatrix = (degrees: number) => {
    const angleInRadians = this.getAngleInRadians(degrees)
    return new Matrix(
      [Math.cos(angleInRadians), -Math.sin(angleInRadians)],
      [Math.sin(angleInRadians), Math.cos(angleInRadians)]
    )
  }

  pointsAreCollinear = ([x1, y1], [x2, y2], [x3, y3]) => {
    const slopeAB = Math.round(((y2 - y1) / (x2 - x1)) * 100) / 100
    const slopeAC = Math.round((y3 - y1) / (x3 - x1) * 100) / 100

    return (slopeAB === slopeAC)
  }

  setPosition(element, coord: { x, y }) {
    element.setAttribute('cx', coord.x)
    element.setAttribute('cy', coord.y)
  }
}
