import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, ReplaySubject } from 'rxjs';
@Injectable({
    providedIn: 'root'
})
export class ObraService {
    private apiRoot: string = "https://uptc-dev.herokuapp.com/api/";
    // private apiRoot: string = "http://9dcf-191-92-96-150.ngrok.io/api/";
    researchPiece$: ReplaySubject<any> = new ReplaySubject();
    constructor(private http: HttpClient) { }

    getFilters(): Observable<any> {
        return <Observable<any>>this.http.get(this.apiRoot + 'setting');
    }

    postFilters(body): Observable<any> {
        return <Observable<any>>this.http.post(this.apiRoot + 'works/filter', body)
    }

    createPiece(body): Observable<any> {
        return this.http.post(this.apiRoot + 'works', body);
    }

    getDetail(_id: string): Observable<any> {
        return <Observable<any>>this.http.get(this.apiRoot + 'works/' + _id);
    }

    getCountWords(pieces): Observable<any> {
        return <Observable<any>>this.http.post(this.apiRoot + 'works/count-words', { ids: pieces });
    }
}