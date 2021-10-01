import { Component, OnInit } from '@angular/core'
import { Router } from '@angular/router'
import { PersistenceService } from '../shared/services'
import { VenueConfigurations } from '../shared/classes/VenueConfigurations'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  configurations: VenueConfigurations[]

  constructor(
    private router: Router,
    private persistenceService: PersistenceService
  ) {}

  ngOnInit(): void {
    this.persistenceService.getConfigurations().subscribe(data => {
      this.configurations = data
    })
  }
  navigateToConfiguration(config) {
    this.router.navigate([`configuration/${config.id}`])
  }
  new(): void {
    this.router.navigate(['configuration'])
  }
}
