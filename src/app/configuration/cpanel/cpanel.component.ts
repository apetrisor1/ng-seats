import { Component, OnInit } from '@angular/core'
import { AutoAlignService, GroupingService, MultiSelectService, PersistenceService, RotateService } from '../../shared/services'
import { extractTargetIdFromURL } from '../util'
import { FormGroup, FormBuilder } from '@angular/forms'
import { Router } from '@angular/router'
import { NgbModal } from '@ng-bootstrap/ng-bootstrap'

@Component({
  selector: 'app-cpanel',
  templateUrl: './cpanel.component.html',
  styleUrls: ['./cpanel.component.css']
})
export class CpanelComponent implements OnInit {
  degreesInput
  sector

  constructor(
    private autoAlignService: AutoAlignService,
    private grouping: GroupingService,
    private modalService: NgbModal,
    private multiSelect: MultiSelectService,
    private persistenceService: PersistenceService,
    private rotateService: RotateService,
    private router: Router,
    private formBuilder: FormBuilder
  ) {
    this.sector = this.grouping.getCoords().sector
    this.createForm()
  }
  myForm: FormGroup

  ngOnInit(): void {}

  autoAlign = () => this.autoAlignService.autoAlign()

  clearSelection = () => this.multiSelect.clearSelection()
  deleteSelected = () => this.multiSelect.deleteSelected()

  open(content) {
    this.grouping.setCoords(this.sector, 0, 0)
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title', centered: true, size: 'sm' })
  }

  private createForm() {
    this.myForm = this.formBuilder.group({ sector: this.sector, rows: 1, columns: 1  })
  }

  rotate(clockwise: boolean) {
    if (!this.degreesInput) {
      this.degreesInput = document.getElementById('input-degrees')
    }
    const degrees = parseInt(this.degreesInput.value, 10)
    this.rotateService.rotate(degrees, clockwise)
  }

  submitForm(filledOutForm) {
    this.myForm = filledOutForm
    const { sector, rows, columns } = filledOutForm?.value
    this.grouping.setCoords(sector, rows, columns)
    this.modalService.dismissAll()
  }

  save() {
    this.persistenceService.saveConfiguration(
      extractTargetIdFromURL(this.router)
    ).subscribe(data => {
      console.log('Configuration saved!', data)
    }, (err) => {
      console.log('Error when saving configuration', err)
    })
  }

  back() {
    this.router.navigate(['home'])
  }

  saveAndBack() {
    this.save()
    this.back()
  }

  toggleMultiDrag = () => (this.multiSelect.toggleMultiDrag())
}
