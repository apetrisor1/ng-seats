import { Directive, HostListener } from '@angular/core'
import { SEAT } from '../styles/svg.styles'

@Directive({
  selector: '[appMultiSelect]'
})
export class MultiSelectDirective {
  start: number[] = []
  end: number[] = []
  seats: any[] = [] // fix any

  constructor() { }

  @HostListener('mousedown', ['$event'])
  onMouseDown(event): void {
    const { offsetX: x, offsetY: y, target } = event
    this.start = []
    this.start.push(x, y)
  }

  @HostListener('mouseup', ['$event'])
  onMouseUp(event): void {
    const { offsetX: x, offsetY: y, target } = event
    this.end = []
    this.end.push(x, y)
    const seats = target.getElementsByClassName('circle')
    this.selectSeats(seats, this.start, this.end)
  }

  private selectSeats = (seats, start, end) => {
    this.seats = []
    const [startX, startY] = start
    const [endX, endY] = end
    for (const seat of seats) {
      const seatX = seat.cx.baseVal.value
      const seatY = seat.cy.baseVal.value

      const leftRightTopBottom = (seatX >= startX && seatY >= startY && seatX <= endX && seatY <= endY)
      const leftRightBottomTop = (seatX >= startX && seatY <= startY && seatX <= endX && seatY >= endY)
      const rightLeftTopBottom = (seatX <= startX && seatY >= startY && seatX >= endX && seatY <= endY)
      const rightLeftBottomTop = (seatX <= startX && seatY <= startY && seatX >= endX && seatY >= endY)

      if (
        leftRightTopBottom ||
        leftRightBottomTop ||
        rightLeftTopBottom ||
        rightLeftBottomTop
      ) {
        this.seats.push(seat)
      }
    }

    this.seats.map(seat => seat.setAttribute('fill', SEAT.svgFillSelected))
  }
}
