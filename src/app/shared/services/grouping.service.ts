import { EventEmitter, Injectable } from '@angular/core'
import { DEFAULT_SECTOR } from '../CONSTANTS'

/* Provides information transfer between admin panel and area components
about the new grouping of draggable seats. */

@Injectable({
  providedIn: 'root'
})
export class GroupingService {
  configurationChangedEvent: EventEmitter<any> = new EventEmitter<any>()
  sector; rows; columns

  constructor() {
    this.sector = DEFAULT_SECTOR
    this.columns = 0
    this.rows = 0
  }

  getCoords = () => ({ sector: this.sector, rows: this.rows, columns: this.columns })
  setCoords = (sector: string, rows: number, columns: number) => {
    this.sector = sector
    this.rows = rows
    this.columns = columns
    this.configurationChangedEvent.emit({ sector: this.sector, rows: this.rows, columns: this.columns })
  }
}
