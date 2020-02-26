import { Component, OnInit } from '@angular/core'
import { GroupingService } from '../shared/services/grouping.service'
import { SEAT } from '../shared/styles/svg.styles'

@Component({
  selector: 'app-area',
  templateUrl: './area.component.html',
  styleUrls: ['./area.component.css', '../app.component.css']
})
export class AreaComponent implements OnInit {
  circleIds   = new Array()
  svgHeight   = SEAT.svgHeight
  svgWidth    = SEAT.svgWidth
  svgFill     = SEAT.svgFill

  constructor(private grouping: GroupingService) {
    this.grouping.columnAddedEvent.subscribe((columns) => {
      this.circleIds.push(`row-1-column-${columns}`)
    })
  }

  ngOnInit(): void {
    const { columns } = this.grouping.getCoords()
    this.circleIds.push(`row-1-column-${columns}`)
  }

}
