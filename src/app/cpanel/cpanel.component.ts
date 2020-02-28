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
  constructor(private grouping: GroupingService, private modalService: NgbModal, private formBuilder: FormBuilder) {
    this.createForm()
   }
  myForm: FormGroup

  ngOnInit(): void {}

  open(content) {
    this.grouping.setCoords(0, 0)
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'})
  }

  private createForm() {
    this.myForm = this.formBuilder.group({ rows: 1, columns: 1 })
  }

  submitForm(filledOutForm) {
    this.myForm = filledOutForm
    const { rows, columns } = filledOutForm?.value
    this.grouping.setCoords(rows, columns)
    this.modalService.dismissAll()
  }
}
