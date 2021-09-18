import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable({
    providedIn: "root"
})
export class InterceptorBlog implements HttpInterceptor {
    constructor() { }
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const token: string = sessionStorage.getItem('token');
        let request = req;
        console.log(req)
        if (token) {

            request = req.clone({
                setHeaders: {
                    authorization: `Bearer ${token}`
                }
            });
        }

        return next.handle(request);
    }
}