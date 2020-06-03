import { Component, OnInit } from '@angular/core'
import { GroupingService } from '../../shared/services/grouping.service'
import { SEAT } from '../../shared/styles/svg.styles'

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
  svgHeight       = SEAT.svgHeight
  svgFill         = SEAT.svgFill
  svgSeatX        = SEAT.svgSeatX
  svgSeatY        = SEAT.svgSeatY
  svgSeatRadius   = SEAT.svgSeatRadius
  svgWidth        = SEAT.svgWidth  /* distance between neighbouring seats (cols) */
  /*Style attribute "margin" for <p> elements of class "row" controls distance between seat rows.*/

  constructor(private grouping: GroupingService) {
    const configuration = this.grouping.getCoords()
    this.setCoords(configuration)

    this.grouping.configurationChangedEvent.subscribe((newConfiguration) => {
      this.circleColumns = []
      this.circleRows = []
      this.setCoords(newConfiguration)
    })
  }

  ngOnInit(): void {}

  private setCoords = (configuration) => {
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
