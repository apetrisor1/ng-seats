import { Component, OnInit } from '@angular/core'
import { GroupingService } from '../shared/services/grouping.service'
import { SEAT } from '../shared/styles/svg.styles'

@Component({
  selector: 'app-area',
  templateUrl: './area.component.html',
  styleUrls: ['./area.component.css', '../app.component.css']
})
export class AreaComponent implements OnInit {
  sector
  circleColumns   = new Array()
  circleRows      = new Array()
  svgHeight       = SEAT.svgHeight
  svgWidth        = SEAT.svgWidth
  svgFill         = SEAT.svgFill

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
