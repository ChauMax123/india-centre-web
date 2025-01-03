import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import {LocalStorageService} from '../storage/local.storage.service';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(private readonly localStorageService: LocalStorageService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = this.localStorageService.getRaw('access_token');

    if (token) {
      // Clone the request to add the Authorization header with the Bearer token.
      req = req.clone({
        headers: req.headers.set('Authorization', `Bearer ${token}`).set('Accept', 'application/json')
      });
    }

    return next.handle(req);
  }
}
