import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Credentials } from '../classes/Credentials'
import { POST_LOGIN } from '../BACKEND_API'
import { Observable } from 'rxjs'

@Injectable()
export class LoginService {
  constructor(private httpClient: HttpClient) {}

  login(credentials: Credentials): Observable<any> {
    return this.httpClient.post(POST_LOGIN, credentials)
  }
}
