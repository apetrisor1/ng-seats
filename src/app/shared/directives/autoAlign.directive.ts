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
        if (!this.positioningService.pointsAreCollinear(firstInLoop, secondInLoop, thirdInLoop)) {
          if (fourthInLoop) {
            if (this.positioningService.pointsAreCollinear(firstInLoop, thirdInLoop, fourthInLoop)) {
              secondInLoop = this.positioningService.obtainMiddlePointOnLine(firstInLoop, thirdInLoop)
              this.setSeatPositionAndRefreshCoords(seats, i + 1, secondInLoop)
            } else if (this.positioningService.pointsAreCollinear(secondInLoop, thirdInLoop, fourthInLoop)) {
              firstInLoop = this.positioningService.obtainThirdPointOnLine(thirdInLoop, secondInLoop)
              this.setSeatPositionAndRefreshCoords(seats, i, firstInLoop)
            } else {
              thirdInLoop = this.positioningService.obtainThirdPointOnLine(firstInLoop, secondInLoop)
              this.setSeatPositionAndRefreshCoords(seats, i + 2, thirdInLoop)

            }
          } else {
            thirdInLoop = this.positioningService.obtainThirdPointOnLine(firstInLoop, secondInLoop)
            this.setSeatPositionAndRefreshCoords(seats, i + 2, thirdInLoop)
          }
        }
      }
      this.seatsAsCoordinates = []
    }
  }

  private setSeatPositionAndRefreshCoords = (seats, index, newCoords) => {
    this.positioningService.setPosition(seats[index], newCoords)
    this.matrixBeforeAlign = this.positioningService.getAbsoluteCoordsMatrix(seats)
    this.seatsAsCoordinates = this.matrixBeforeAlign.columns()
  }
}
