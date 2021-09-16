import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
    providedIn: 'root'
})
export class ObraService {
    private apiRoot: string = "https://uptc-dev.herokuapp.com/api/"
    constructor(private http: HttpClient) { }

    getFilters(): Observable<any> {
        return <Observable<any>>this.http.get(this.apiRoot + 'settings');
    }

    postFilters(body): Observable<any> {
        return <Observable<any>>this.http.post(this.apiRoot + 'works/filter', body)
    }

    getDetail(_id:string):Observable<any> {
        return <Observable<any>>this.http.get(this.apiRoot + 'works/' + _id);
    }
}