import { Directive } from '@angular/core'
import { AutoAlignService, MultiSelectService, PositioningService, RotateService } from '../services'
import { Matrix } from '../classes/matrix'

@Directive({
  selector: '[appAutoAlign]'
})
export class AutoAlignDirective {

  private matrixBeforeAlign: Matrix
  private seatsAsCoordinates: any[]

  constructor(
    private autoAlignService: AutoAlignService,
    private multiSelect: MultiSelectService,
    private positioningService: PositioningService
  ) {
    this.autoAlignService.oneLineAutoAlignedEvent.subscribe(() => this.oneLineAutoAlign())
  }

  /*P, M and Q are three collinear points and PM = MQ.
  Given P (x1, y1) and M (x2, y2), find out Q (x3, y3) as follows:
  (x3 + x1) / 2 === x2 results in x3 = 2*x2 - x1
  (y3 + y1) / 2 === y2 results in y3 = 2*y2 - y1
  */
  private obtainThirdPointOnLine = ([x1, y1], [x2, y2]) => ({ x: (2 * x2) - x1, y: (2 * y2) - y1 })

  /*P, M and Q are three collinear points and PM = MQ.
  Given P (x1, y1) and Q (x2, y2), find out M (x3, y3) as follows:
  x3 = x1 + x2 / 2
  y3 = y1 + y2 / 2
  */
  private obtainMiddlePointOnLine = ([x1, y1], [x2, y2]) => ({ x: (x1 + x2) / 2, y: (y1 + y2) / 2 })

  oneLineAutoAlign = () => {
    const text = this.multiSelect.getSelection()
    if (text) {
      const data = [...text.split('_')]
      const seats = data.map(id => document.getElementById(id))
      this.matrixBeforeAlign = this.positioningService.getAbsoluteCoordsMatrix(seats)
      this.seatsAsCoordinates = this.matrixBeforeAlign.columns()

      if (this.seatsAsCoordinates.length < 3) {
        return
      }

      for (let i = 0; i < this.seatsAsCoordinates.length - 2; i ++) {
        let firstInLoop = this.seatsAsCoordinates[i]
        let secondInLoop = this.seatsAsCoordinates[i + 1]
        let thirdInLoop = this.seatsAsCoordinates[i + 2]
        const fourthInLoop = this.seatsAsCoordinates[i + 3]
        if (!this.pointsAreCollinear(firstInLoop, secondInLoop, thirdInLoop)) {
          if (fourthInLoop) {
            if (this.pointsAreCollinear(firstInLoop, thirdInLoop, fourthInLoop)) {
              secondInLoop = this.obtainMiddlePointOnLine(firstInLoop, thirdInLoop)
              this.setSeatPositionAndRefreshCoords(seats, i + 1, secondInLoop)
            } else if (this.pointsAreCollinear(secondInLoop, thirdInLoop, fourthInLoop)) {
              firstInLoop = this.obtainThirdPointOnLine(thirdInLoop, secondInLoop)
              this.setSeatPositionAndRefreshCoords(seats, i, firstInLoop)
            } else {
              thirdInLoop = this.obtainThirdPointOnLine(firstInLoop, secondInLoop)
              this.setSeatPositionAndRefreshCoords(seats, i + 2, thirdInLoop)

            }
          } else {
            thirdInLoop = this.obtainThirdPointOnLine(firstInLoop, secondInLoop)
            this.setSeatPositionAndRefreshCoords(seats, i + 2, thirdInLoop)
          }
        }
      }
      this.seatsAsCoordinates = []
    }
  }

  private pointsAreCollinear = ([x1, y1], [x2, y2], [x3, y3]) => {
    const slopeAB = Math.round(((y2 - y1) / (x2 - x1)) * 100) / 100
    const slopeAC = Math.round((y3 - y1) / (x3 - x1) * 100) / 100

    return (slopeAB === slopeAC)
  }

  private setSeatPositionAndRefreshCoords = (seats, index, newCoords) => {
    this.positioningService.setPosition(seats[index], newCoords)
    this.matrixBeforeAlign = this.positioningService.getAbsoluteCoordsMatrix(seats)
    this.seatsAsCoordinates = this.matrixBeforeAlign.columns()
  }
}
