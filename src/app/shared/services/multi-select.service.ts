import { EventEmitter, Injectable } from '@angular/core'

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
  multiDragEvent: EventEmitter<any> = new EventEmitter<any>()

  currentSelectionString: string

  constructor() { }

  clearSelection = () => {
    this.selectionClearedEvent.emit()
    this.currentSelectionString = ''
  }
  setSelection = (text) => this.currentSelectionString = text
  getSelection = () => this.currentSelectionString
  toggleMultiDrag = () => this.multiDragEvent.emit()
}
