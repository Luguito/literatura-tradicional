import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { IPostCreate, IPostGetter, IPostResponse, IPostUpdate } from './blog.interfaces';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class BlogService {
    private apiRoot: string = "https://uptc-dev.herokuapp.com/api/";
    private headers = new HttpHeaders();
    constructor(private http: HttpClient) { 
        this.headers.append('Authorization', `Bearer ${sessionStorage.getItem('token')}`)
    }

    getPost(): Observable<IPostGetter> {
        return (<Observable<IPostGetter>>this.http.get(this.apiRoot + 'post'));
    }
    createPost(post: IPostCreate): Observable<IPostGetter> {
        return (<Observable<IPostGetter>>this.http.post(this.apiRoot + 'post', post))
    }
    updatePost(post_id: string, post: IPostUpdate): Observable<IPostResponse> {
        return (<Observable<IPostResponse>>this.http.put(this.apiRoot + 'post/' + post_id, post))
    }
    deletePost(post_id: string) {
        return (<Observable<IPostResponse>>this.http.delete(this.apiRoot + 'post/' + post_id))
    }
}