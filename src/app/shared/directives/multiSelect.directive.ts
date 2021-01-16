import { Directive, HostListener } from '@angular/core'
import { MultiSelectService } from '../services'
import { SEAT } from '../styles/svg.styles'

/* Directive applied to main stage area.
Allows selecting one or more seats by doing a drag movement
with the mouse, while not in multi-drag mode.

Selection is used by:
- MovementDirective, when dragging multiple seats in main area.
- This directive, to remove selected seats.

multiSelect service handles data transfer.
*/

@Directive({
  selector: '[appMultiSelect]'
})
export class MultiSelectDirective {
  start: number[] = []
  end: number[] = []
  seats: any[] = []

  constructor(private multiSelect: MultiSelectService) {
    this.multiSelect.selectionClearedEvent.subscribe(() => {
      Array.from(document.getElementsByClassName('circle')).map(seat => seat.setAttribute('fill', SEAT.svgFill))
      this.seats = []
    })
    this.multiSelect.selectionDeletedEvent.subscribe(() => {
      const idsToDelete = [...this.multiSelect.getSelection().split('_')]
      idsToDelete.map(id => document.getElementById(id)?.remove())
      this.seats = []
    })
  }

  @HostListener('mousedown', ['$event'])
  onMouseDown(event): void {
    const { offsetX: x, offsetY: y } = event
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

    console.log({
      seats,
      len: seats.length
    })

    /* Seats are coloured based on mouse selection, then this.seats is emptied, in this.colourSeats().
    Last, this.seats is filled again based on color in multiSelect.selectColouredSeats().
    This is done to avoid byzantine logic when doing repeated selections, around pushing/removing elements in this.seats. */
    this.multiSelect.selectColouredSeats(this.seats)
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

      if (leftRightTopBottom || leftRightBottomTop || rightLeftTopBottom || rightLeftBottomTop) {
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
