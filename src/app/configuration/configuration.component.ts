import { Component, OnInit } from '@angular/core'
import { extractTargetIdFromURL } from './util'
import { PersistenceService } from '../shared/services'
import { Router } from '@angular/router'

@Component({
  selector: 'app-configuration',
  templateUrl: './configuration.component.html',
  styleUrls: ['./configuration.component.css']
})
export class ConfigurationComponent implements OnInit {
  configurationId: RegExpMatchArray | null
  existingConfiguration: any

  constructor(
    private router: Router,
    private persistenceService: PersistenceService
  ) { }

  ngOnInit(): void {
    this.existingConfiguration = extractTargetIdFromURL(this.router)
    if (this.existingConfiguration) {
      this.persistenceService.getConfiguration(this.existingConfiguration).subscribe(configuration => {
        this.persistenceService.setConfigurationAsReadyToDisplay(configuration)
      }, () => {
        window.alert('Something went wrong loading this configuration, going home...')
        this.router.navigate(['home'])
      })
    }
  }
}
