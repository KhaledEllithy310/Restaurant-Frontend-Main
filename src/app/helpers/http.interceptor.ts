import { Injectable, Injector } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HTTP_INTERCEPTORS
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { StorgeTokenService } from '../services/storge-token.service';
// import { StorgeTokenService } from ''
@Injectable()
export class HttpInterceptorInterceptor implements HttpInterceptor {

  constructor(private injector: Injector, private storgeService: StorgeTokenService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    let Tokenrequest = request.clone({
      setHeaders: {
        'Authorization': `Bearer ${this.storgeService.getUser().access_token}`,
      }
    });
    return next.handle(Tokenrequest);
  }
}
