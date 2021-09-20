import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, ReplaySubject } from 'rxjs';
@Injectable({
    providedIn: 'root'
})
export class ObraService {
    private apiRoot: string = "https://uptc-dev.herokuapp.com/api/";
    // private apiRoot: string = "http://ab04-181-235-66-173.ngrok.io/api/";
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

    getCountWords({ pieces }): Observable<any> {
        return <Observable<any>>this.http.post(this.apiRoot + 'works/count-words', { ids: pieces });
    }
    getCountPhrase({ pieces, count }): Observable<any> {
        return <Observable<any>>this.http.post(this.apiRoot + 'works/count-phrase', { ids: pieces, numOfwords: count });
    }
    getWordMonit({ pieces, text }): Observable<any> {
        return <Observable<any>>this.http.post(this.apiRoot + 'works/word-phrase-monit', { ids: pieces, text: text });
    }
    getSameSentence({ pieces, count }): Observable<any> {
        return <Observable<any>>this.http.post(this.apiRoot + 'works/sentences-with-same-beginning', { ids: pieces, numOfwords: count });
    }
    getSameBeginning({ pieces, count }): Observable<any> {
        return <Observable<any>>this.http.post(this.apiRoot + 'works/paragraph-with-same-beginning', { ids: pieces, numOfwords: count });
    }
    getOwnNames({ pieces }): Observable<any> {
        return <Observable<any>>this.http.post(this.apiRoot + 'works/own-names', { ids: pieces });
    }
    getPercentagesMatch({ pieces, count }): Observable<any> {
        return <Observable<any>>this.http.post(this.apiRoot + 'works/percentage-matches', { ids: pieces });
    }
}