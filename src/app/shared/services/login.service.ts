import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Credentials } from '../classes/Credentials'
import { Observable } from 'rxjs'

@Injectable()
export class LoginService {
  constructor(private httpClient: HttpClient) {}

  login(credentials: Credentials) {
    // return this.httpClient.post('api/auth', credentials)
  }
}
