import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IUserInvite, IUserResponse } from './users.interface';
import { Observable } from 'rxjs';
@Injectable({
    providedIn: 'root'
})
export class UserService {
    private apiRoot: string = "https://uptc-dev.herokuapp.com/api/"
    constructor(private http: HttpClient) { }

    inviteUser(user: IUserInvite): Observable<IUserResponse> {
        return <Observable<IUserResponse>>this.http.post(this.apiRoot + 'users/invite', user);
    }
}