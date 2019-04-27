import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { AppState } from '../state/app.state';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    constructor(private store: Store, private router: Router) {}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const token = this.store.selectSnapshot(AppState.token);
        if (token && req.url) {

            if (req.url.includes(environment.backendEndpoint)) {
                const cloned = req.clone({
                    headers: req.headers.set('Authorization', `Bearer ${token}`)
                });
                return next.handle(cloned);
            }
        }
        return next.handle(req);
    }
}
