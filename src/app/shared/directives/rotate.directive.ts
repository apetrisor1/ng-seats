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
d) Set new coordinates of points, obtained as pivot point coordinates + new relative coordinates 

Matrix refers to the seat coordinates matrix, relative to the matrix pivot point.*/

@Directive({
  selector: '[appRotate]'
})
export class RotateDirective {
  private pivotPoint = { x: 0, y: 0 }
  private matrixBeforeRotation: Matrix
  private matrixAfterRotation: Matrix

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
    this.pivotPoint = this.positioningService.getMatrixPivotPoint(seats)
    this.matrixBeforeRotation = this.positioningService.getRelativeCoordsMatrix(seats)
  }

  private createRotatedCoordsMatrix = (seatMatrix: Matrix, rotationMatrix: Matrix) => {
    this.matrixAfterRotation = this.positioningService.multiply2x2Matrices(seatMatrix, rotationMatrix)
  }

  private initializeRotation = ({degrees, clockwise}) => {
    if (degrees < 0 || degrees > 360) { return }
    if (clockwise) { degrees = 360 - degrees }

    this.matrixBeforeRotation = new Matrix([], []) /* One array for X-coords, one for Y-coords */
    this.matrixAfterRotation = new Matrix([], [])

    const text = this.multiSelect.getSelection()
    if (text) {
      const data = [...text.split('_')]
      const seats = data.map(id => document.getElementById(id))
      this.createInitialCoordsMatrix(seats)
      const transformationMatrix = this.positioningService.obtainTransformationMatrix(degrees)
      this.createRotatedCoordsMatrix(this.matrixBeforeRotation, transformationMatrix)
      this.rotateSeats(seats)
    }
  }

  private rotateSeats = (seats) => {
    for (let i = 0; i < seats.length; i++) {
      const xRelativeToPivot = this.matrixAfterRotation.columns()[i][0]
      const yRelativeToPivot = this.matrixAfterRotation.columns()[i][1]

      this.positioningService.setPosition(seats[i], {
        x: this.pivotPoint.x + xRelativeToPivot,
        y: this.pivotPoint.y + yRelativeToPivot
      })
    }
  }
}
