import { EventEmitter, Injectable } from '@angular/core'
import { SEAT } from '../styles/svg.styles'

/*
Provides information transfer between admin panel and area component:
- user cleared selection
- whether the user can select multiple seats by mouse-drag
- current selection of seats to be dragged. (acts as the "text" property on event.dataTransfer in draggable.directive.ts)
*/

@Injectable({
  providedIn: 'root'
})
export class MultiSelectService {
  selectionClearedEvent: EventEmitter<any> = new EventEmitter<any>()
  selectionDeletedEvent: EventEmitter<any> = new EventEmitter<any>()
  multiDragEvent: EventEmitter<any> = new EventEmitter<any>()

  currentSelectionString: string

  constructor() { }

  clearSelection = () => {
    this.selectionClearedEvent.emit()
    this.currentSelectionString = ''
  }
  deleteSelected = () => {
    this.selectionDeletedEvent.emit()
    this.currentSelectionString = ''
  }
  setSelection = (text) => this.currentSelectionString = text
  getSelection = () => this.currentSelectionString
  toggleMultiDrag = () => this.multiDragEvent.emit()

  refreshSelection = (seats) => {
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
}
