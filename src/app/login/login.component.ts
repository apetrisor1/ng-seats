
import { Component, OnInit } from '@angular/core'
import { FormControl, FormGroup, FormBuilder, Validators, FormGroupDirective, NgForm } from '@angular/forms'
import { ErrorStateMatcher } from '@angular/material/core'
import { Router } from '@angular/router'

import { Credentials } from '../shared/classes/Credentials'
import { LoginService } from '../shared/services/login.service'

/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted))
  }
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {

  credentials: Credentials
  loginForm: FormGroup
  passwordCtrl: FormControl
  submitted: boolean
  success: boolean
  wrongCredentials: boolean

  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ])

  matcher = new MyErrorStateMatcher()

  constructor(private fb: FormBuilder, private loginService: LoginService, private router: Router) { }

  ngOnInit() {
    this.submitted = false
    this.success = false
    this.wrongCredentials = false
    this.credentials = new Credentials()
    this.passwordCtrl = new FormControl('', Validators.required)
    this.loginForm = this.fb.group({
      email: this.emailFormControl,
      password: this.passwordCtrl
    })
  }

  login() {
    this.submitted = true
    this.credentials.Email = this.loginForm.value.email
    this.credentials.Password = this.loginForm.value.password

    // Perform login
    this.loginService.login(this.credentials).subscribe(data => {
      if (data) {
        console.log('login data', data)
        this.success = true
         // Save response to local storage
        // localStorage.setItem('user_info', JSON.stringify(data))
        // this.router.navigate(['configuration'])
      }
    }, (err) => {
      console.log('err')
      console.log(err)

      this.success = false
      this.wrongCredentials = true
    })

  }
}
