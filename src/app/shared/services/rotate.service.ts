import { EventEmitter, Injectable } from '@angular/core'

/* Provides information transfer:
C-Panel Component -> Rotate Directive
- user rotated selection
*/
@Injectable({
  providedIn: 'root'
})
export class RotateService {

  rotatedSelectionEvent: EventEmitter<any> = new EventEmitter<any>()

  constructor() { }

  rotate = (degrees, clockwise = true) => {
    this.rotatedSelectionEvent.emit({ degrees: degrees || 0, clockwise })
  }
}
