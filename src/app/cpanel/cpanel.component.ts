import { Component, OnInit } from '@angular/core'
import { GroupingService } from '../shared/services/grouping.service'
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms'

import { NgbModal } from '@ng-bootstrap/ng-bootstrap'

@Component({
  selector: 'app-cpanel',
  templateUrl: './cpanel.component.html',
  styleUrls: ['./cpanel.component.css', '../app.component.css']
})
export class CpanelComponent implements OnInit {
  sector

  constructor(private grouping: GroupingService, private modalService: NgbModal, private formBuilder: FormBuilder) {
    this.sector = this.grouping.getCoords().sector
    this.createForm()
  }
  myForm: FormGroup

  ngOnInit(): void {}

  open(content) {
    this.grouping.setCoords(this.sector, 0, 0)
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title', centered: true, size: 'sm' })
  }

  private createForm() {
    this.myForm = this.formBuilder.group({ sector: this.sector, rows: 1, columns: 1  })
  }

  submitForm(filledOutForm) {
    this.myForm = filledOutForm
    const { sector, rows, columns } = filledOutForm?.value
    this.grouping.setCoords(sector, rows, columns)
    this.modalService.dismissAll()
  }
}
