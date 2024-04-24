import { HttpEvent, HttpHandler, HttpInterceptor, HttpParams, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { AuthService } from "./auth.service";
import { Observable, exhaustMap, take } from "rxjs";

@Injectable()
export class AuthInterceptorService implements HttpInterceptor {
    constructor(private authService: AuthService) {}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return this.authService.user.pipe(
            take(1), // this operator allow to take one res. obj then automatically unsubscribe it.
            exhaustMap(user => { // this operator allow to first observable to complete it work then replace with new observable.
                if(!user) {
                    return next.handle(req);
                } else {
                    const modifiedReq = req.clone({
                        params: new HttpParams().set('auth', user.token)
                    });
                    return next.handle(modifiedReq);
                }
            })
        );
    }

}