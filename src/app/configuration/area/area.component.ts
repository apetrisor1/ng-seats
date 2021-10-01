import { Component, OnInit } from '@angular/core'
import { GroupingService, PersistenceService } from '../../shared/services'
import { CANVAS, SEAT, SVGXMLNamespace } from '../../shared/styles/svg.styles'
import { VenueConfigurations, IVenueSeat } from '../../shared/classes/VenueConfigurations'

@Component({
  selector: 'app-area',
  templateUrl: './area.component.html',
  styleUrls: ['./area.component.css']
})
export class AreaComponent implements OnInit {
  circleColumns   = new Array()
  circleRows      = new Array()
  now = new Date().getTime()
  sector
  seatClassName   = SEAT.htmlClassName
  svgHeight       = SEAT.svgHeight
  svgFill         = SEAT.svgFill
  svgSeatX        = SEAT.svgSeatX
  svgSeatY        = SEAT.svgSeatY
  svgSeatRadius   = SEAT.svgSeatRadius
  svgWidth        = SEAT.svgWidth  /* distance between neighbouring seats (cols) */
  /*Style attribute "margin" for <p> elements of class "row" controls distance between seat rows.*/

  constructor(
    private groupingService: GroupingService,
    private persistenceService: PersistenceService
  ) {}

  ngOnInit(): void {
    this.setCanvasSize()

    this.groupingService.configurationChangedEvent.subscribe((newConfiguration) => {
      this.circleColumns = []
      this.circleRows = []
      this.setCoords(newConfiguration)
    })

    this.persistenceService.configurationReadyForDisplay.subscribe((configuration: VenueConfigurations) => {
      this.setCanvasSize(configuration.canvas_height, configuration.canvas_width)
      this.createSVGSeats(configuration.seats)
    })
  }

  private clearCanvas(): void {
    const seats = document.getElementsByClassName('circle')
    const len = seats?.length
    for (let i = len - 1; i >= 0; i --) {
      seats[i].remove()
    }
  }

  private createSVGSeats(seatCoords: IVenueSeat[]): void {
    this.clearCanvas()
    const len = seatCoords?.length
    for (let i = len - 1; i >= 0; i --) {
      const { id, lon: cx, lat: cy } = seatCoords[i]
      const seat: any = document.createElementNS(SVGXMLNamespace, 'circle')
      seat.setAttribute('class', this.seatClassName)
      seat.setAttribute('cx', cx)
      seat.setAttribute('cy', cy)
      seat.setAttribute('draggable', true)
      seat.setAttribute('id', id)
      seat.setAttribute('r', this.svgSeatRadius.toString())
      seat.setAttribute('fill', this.svgFill )
      const dropzone = document.getElementById('dropzone')
      dropzone?.appendChild(seat)
    }
  }

  private setCanvasSize(height?: string, width?: string): void {
    const canvas = document.getElementById('svg-container')
    if (canvas) {
      canvas.style.height = height || CANVAS.svgHeight
      canvas.style.width = width || CANVAS.svgWidth
    }
  }

  private setCoords (configuration): void {
    this.now = new Date().getTime()
    const { sector, rows, columns } = configuration
    this.sector = sector
    for (let i = 1; i <= rows; i++) {
      this.circleRows.push(i)
    }
    for (let j = 1; j <= columns; j++) {
      this.circleColumns.push(j)
    }
  }
}
