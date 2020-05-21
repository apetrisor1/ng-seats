import { EventEmitter, Injectable } from '@angular/core'

@Injectable({
  providedIn: 'root'
})
export class AutoAlignService {

  oneLineAutoAlignedEvent: EventEmitter<any> = new EventEmitter<any>()

  constructor() { }

  autoAlign = () => {
    this.oneLineAutoAlignedEvent.emit()
  }
}
