import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators'
@Injectable({
    providedIn: 'root'
})
export class LoginService {
    private apiRoot: string = "https://uptc-dev.herokuapp.com/api/auth/";
    constructor(private http: HttpClient) { }

    userLogin(user) {
        return this.http.post(this.apiRoot + 'login', user).pipe(catchError(({error}) => {
            throw error.message 
        }));
    }

    forgotPassword(username){
        return this.http.post(this.apiRoot + 'forgot-password', username);
    }
}