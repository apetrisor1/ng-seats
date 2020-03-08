import { Directive, HostListener } from '@angular/core'
import { MultiSelectService } from '../services'
import { SEAT } from '../styles/svg.styles'

@Directive({
  selector: '[appMultiSelect]'
})
export class MultiSelectDirective {
  start: number[] = []
  end: number[] = []
  seats: any[] = [] // fix any

  constructor(private multiSelect: MultiSelectService) {
    this.multiSelect.selectionClearedEvent.subscribe(() => {
      Array.from(document.getElementsByClassName('circle')).map(seat => seat.setAttribute('fill', SEAT.svgFill))
      this.seats = []
    })
  }

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
    this.colourSeats(seats, this.start, this.end)

    /* Seats are coloured based on mouse selection, then this.seats is emptied. Last, this.seats is filled based on color.
    This is done to avoid byzantine logic around pushing/removing from this.seats*/
    Array.from(document.getElementsByClassName('circle')).map(seat => {
      const fill = seat.getAttribute('fill')
      if (fill === SEAT.svgFillSelected) {
        this.seats.push(seat)
      }
    })
    let text = ''
    for (const seat of this.seats) {
      text += `${seat.id}_`
    }
    this.multiSelect.setSelection(text)
  }

  private colourSeats = (seats, start, end) => {
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
    if (this.seats.length) {
      // Get reverse fill from first element to avoid streetlight behaviour
      const fill = this.seats[0].getAttribute('fill')
      const reverse = fill === SEAT.svgFill ? SEAT.svgFillSelected : SEAT.svgFill
      this.seats.map(seat => seat.setAttribute('fill', reverse))
      this.seats = []
    }
  }
}
