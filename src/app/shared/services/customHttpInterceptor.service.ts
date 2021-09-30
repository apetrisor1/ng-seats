import { environment } from '../../../environments/environment'
import { Injectable } from '@angular/core'
import {
  HttpEvent,
  HttpHandler,
  HttpHeaders,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http'
import { MASTER_KEY } from '../BACKEND_API'
import { Observable } from 'rxjs'

@Injectable()
export class InterceptService  implements HttpInterceptor {
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let cachedUser: { token: string, user }
    let userCachedAsString = localStorage.getItem('user_info')
    let jwtToken: string

    if (userCachedAsString) {
      cachedUser = JSON.parse(userCachedAsString)
      jwtToken = request.url.includes('auth') ?  MASTER_KEY : cachedUser.token
    } else {
      jwtToken = MASTER_KEY
    }

    if (!request.url.includes('http')) {
      request = request.clone({
        url : `${environment.apiRoot}${request.url}`,
        headers: new HttpHeaders({
          'Authorization': `Bearer ${jwtToken}`,
          'Content-Type': 'application/json'
        })
      })
    }
    console.log(request)
    return next.handle(request)
  }
}
