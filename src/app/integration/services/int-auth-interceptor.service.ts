import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { exhaustMap, Observable, take } from "rxjs";
import { environment } from "src/environments/environment";
import { IntUserDataService } from "./int-user-data.service";

@Injectable()
export class IntAuthInterceptor implements HttpInterceptor {
  constructor(private m_UserDataService: IntUserDataService){}
  
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return this.m_UserDataService.m_Token$.pipe(
      take(1),
      exhaustMap(token => {
        if(token != null && req.url.indexOf(environment.integrationApiUrl) != -1 && req.url.indexOf('login') == -1){
          const modifiedReq = req.clone({
            setHeaders: { Authorization: `Bearer ${token}` }
          })
          return next.handle(modifiedReq);
        }
        return next.handle(req);
      })
    );
  }
}