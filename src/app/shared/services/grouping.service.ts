import { EventEmitter, Injectable } from '@angular/core'

/* Provides information transfer between admin panel and area components
about the selected grouping of draggable seats. */

@Injectable({
  providedIn: 'root'
})
export class GroupingService {
  columnAddedEvent: EventEmitter<any> = new EventEmitter<any>()
  configurationChangedEvent: EventEmitter<any> = new EventEmitter<any>()
  rows; columns

  constructor() {
    this.columns = 1
    this.rows = 1
  }

  getCoords = () => ({ rows: this.rows, columns: this.columns })

  increaseColumns = () => {
    this.columns ++
    this.columnAddedEvent.emit(this.columns)
  }

   setCoords = (rows: number, columns: number) => {
    this.rows = rows
    this.columns = columns
    this.configurationChangedEvent.emit({ rows: this.rows, columns: this.columns })
  }
}
