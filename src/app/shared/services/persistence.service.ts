import { EventEmitter, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { GET_VENUES, POST_VENUE, PUT_VENUE, GET_USERS } from '../BACKEND_API'
import { VenueConfigurations, IVenueSeat } from '../classes/VenueConfigurations'
import { Observable } from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class PersistenceService {
  configurationReadyForDisplay: EventEmitter<any> = new EventEmitter<any>()
  venueConfiguration: VenueConfigurations = new VenueConfigurations()
  constructor(private httpClient: HttpClient) { }

  getConfiguration(configurationId): Observable<any> {
    return this.httpClient.get(`${GET_VENUES}/${configurationId}`)
  }

  getConfigurations(): Observable<any> {
    return this.httpClient.get(`${GET_USERS}/me${GET_VENUES}`)
  }

  saveConfiguration(currentId?: string): Observable<any> {
    const canvas: HTMLElement|null = document.getElementById('svg-container')
    this.venueConfiguration.canvas_height = canvas?.style.height
    this.venueConfiguration.canvas_width = canvas?.style.width
    this.venueConfiguration.seats = this.getCoordinatesForAllSeatsOnCanvas()

    if (currentId) {
      return this.httpClient.put(`${PUT_VENUE}/${currentId}`, this.venueConfiguration)
    } else {
      return this.httpClient.post(POST_VENUE, this.venueConfiguration)
    }
  }

  private getCoordinatesForAllSeatsOnCanvas(): any {
    return Array.from(document.getElementsByClassName('circle')).map(seat => {
      const seatX = seat.attributes.getNamedItem('cx')?.value
      const seatY = seat.attributes.getNamedItem('cy')?.value
      // const seatId = seat.attributes.getNamedItem('id')?.value

      return [seatX, seatY]
    })
  }

  setConfigurationAsReadyToDisplay(configuration: VenueConfigurations) {
    this.configurationReadyForDisplay.emit(configuration)
  }
}
