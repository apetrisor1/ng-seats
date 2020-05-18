import { Directive } from '@angular/core'
import { MultiSelectService, PositioningService, RotateService } from '../services'
import { Matrix } from '../classes/matrix'

/* Directive applied to any group of seats in the main area, if selected.
Rotates one or more seats:
a) all seats are mapped with coordinates relative to the pivot. (middle of group)
  Exammple of 4x4 seats matrix: [
    [-15, 15], [15, 15],
    [-15, -15], [15, -15]
  ]
b) Rotational transformation matrix is obtained for given angle
c) Rotated coordinates matrix = a) * b)
d) Set new coordinates of points, obtained as pivot point coordinates + new relative coordinates */

@Directive({
  selector: '[appRotate]'
})
export class RotateDirective {
  private pivotPoint = { x: 0, y: 0 }
  private relativeSeatCoordsMatrixBeforeRotation: Matrix
  private relativeSeatCoordsMatrixAfterRotation: Matrix

  constructor(
    private multiSelect: MultiSelectService,
    private positioningService: PositioningService,
    private rotateService: RotateService
    ) {
    this.rotateService.rotatedSelectionEvent.subscribe(({ degrees, clockwise }) => {
      this.initializeRotation({ degrees, clockwise })
    })
  }

  private createInitialCoordsMatrix = (seats) => {
    this.pivotPoint = this.positioningService.getPivotPointOfMatrix(seats)
    seats.forEach(seat => {
        const { cx, cy } = seat
        this.relativeSeatCoordsMatrixBeforeRotation.rows[0].push(cx.baseVal.value - this.pivotPoint.x)
        this.relativeSeatCoordsMatrixBeforeRotation.rows[1].push(cy.baseVal.value - this.pivotPoint.y)
    })
  }

  private createRotatedCoordsMatrix = (matrix1: Matrix, matrix2: Matrix) => {
    matrix1.columns().forEach(seat => {
      const rotatedX = (seat[0] * matrix2.rows[0][0]) + (seat[1] * matrix2.rows[0][1])
      const rotatedY = (seat[0] * matrix2.rows[1][0]) + (seat[1] * matrix2.rows[1][1])

      this.relativeSeatCoordsMatrixAfterRotation.rows[0].push(rotatedX)
      this.relativeSeatCoordsMatrixAfterRotation.rows[1].push(rotatedY)
    })
  }

  private initializeRotation = ({degrees, clockwise}) => {
    if (degrees < 0 || degrees > 360) { return }
    if (clockwise) { degrees = 360 - degrees }

    this.relativeSeatCoordsMatrixBeforeRotation = new Matrix([], []) /* One array for X-coords, one for Y-coords */
    this.relativeSeatCoordsMatrixAfterRotation = new Matrix([], [])

    const text = this.multiSelect.getSelection()
    if (text) {
      const data = [...text.split('_')]
      const seats = data.map(id => document.getElementById(id))
      this.createInitialCoordsMatrix(seats)
      const transformationMatrix = this.positioningService.obtainTransformationMatrix(degrees)
      this.createRotatedCoordsMatrix(this.relativeSeatCoordsMatrixBeforeRotation, transformationMatrix)
      this.rotateSeats(seats)
    }
  }

  private rotateSeats = (seats) => {
    for (let i = 0; i < seats.length; i++) {
      const xRelativeToPivot = this.relativeSeatCoordsMatrixAfterRotation.columns()[i][0]
      const yRelativeToPivot = this.relativeSeatCoordsMatrixAfterRotation.columns()[i][1]

      this.positioningService.setPosition(seats[i], {
        x: this.pivotPoint.x + xRelativeToPivot,
        y: this.pivotPoint.y + yRelativeToPivot
      })
    }
  }
}
