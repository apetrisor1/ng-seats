import { EventEmitter, Injectable } from '@angular/core'
import { SEAT } from '../styles/svg.styles'

/* Provides information transfer:

C-Panel Component -> MultiSelect Directive
- user cleared selection
- user deleted selection

C-Panel Component -> Movement Directive:
- user deleted selection
- whether the user can select multiple seats by mouse-drag

MultiSelect Directive -> Movement Directive:
- current selection of seats to be dragged. (acts as the "text" property on event.dataTransfer in draggable.directive.ts)
*/

@Injectable({
  providedIn: 'root'
})
export class MultiSelectService {
  currentSelectionString: string
  multiDragEvent: EventEmitter<any> = new EventEmitter<any>()
  selectionClearedEvent: EventEmitter<any> = new EventEmitter<any>()
  selectionDeletedEvent: EventEmitter<any> = new EventEmitter<any>()

  constructor() { }

  clearSelection = () => {
    this.selectionClearedEvent.emit()
    this.currentSelectionString = ''
  }
  deleteSelected = () => {
    this.selectionDeletedEvent.emit()
    this.currentSelectionString = ''
  }
  getSelection = () => this.currentSelectionString
  setSelection = (text) => this.currentSelectionString = text
  selectColouredSeats = (seats) => {
    Array.from(document.getElementsByClassName('circle')).map(seat => {
      const fill = seat.getAttribute('fill')
      if (fill === SEAT.svgFillSelected) {
        seats.push(seat)
      }
    })
    let text = ''
    for (const seat of seats) {
      text += `${seat.id}_`
    }
    text = text.slice(0, text.length - 1)
    this.setSelection(text)
  }
  toggleMultiDrag = () => {
    this.multiDragEvent.emit()
    document.getElementById('multi-drag-toggle-button')?.getAttribute('class')?.includes('active') ?
    document.getElementById('multi-drag-toggle-button')?.setAttribute('class', 'btn btn-lg btn-outline-primary') :
    document.getElementById('multi-drag-toggle-button')?.setAttribute('class', 'btn btn-lg btn-outline-primary active')
  }
}
