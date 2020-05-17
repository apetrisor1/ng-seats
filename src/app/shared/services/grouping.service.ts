import { EventEmitter, Injectable } from '@angular/core'
import { DEFAULT_SECTOR } from '../CONSTANTS'

/*Provides information transfer:

  C-Panel Component -> Area Component
- The new seat group added by clicking 'Add seating'
*/

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
    this.rows = Math.min(rows, 20)
    this.columns = Math.min(columns, 20)
    this.configurationChangedEvent.emit({ sector: this.sector, rows: this.rows, columns: this.columns })
  }
}
