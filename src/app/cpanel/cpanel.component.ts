import { Component, OnInit } from '@angular/core'
import { GroupingService } from '../shared/services/grouping.service'

@Component({
  selector: 'app-cpanel',
  templateUrl: './cpanel.component.html',
  styleUrls: ['./cpanel.component.css', '../app.component.css']
})
export class CpanelComponent implements OnInit {
  constructor(private grouping: GroupingService) { }

  ngOnInit(): void {}

  increaseColumns(): void {
    this.grouping.increaseColumns()
  }
}
