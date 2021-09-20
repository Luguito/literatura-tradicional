import { Injectable, EventEmitter } from '@angular/core';
import { Subject, Observable, ReplaySubject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class StorageService {
  private piecesSelect$: Subject<any> = new Subject();
  private results$: Subject<any> = new Subject();
  private pieces$: ReplaySubject<any> = new ReplaySubject();
  constructor() { }

  getSelectPieces(): Observable<any> {
    return this.piecesSelect$.asObservable();
  }

  sendPieces(data: { pieces: Array<any>, count?: number, text?: string }) {
    this.piecesSelect$.next(data);
  }

  getResults() {
    return this.results$.asObservable()
  }

  sendResults(data) {
    this.results$.next(data);
  }

  getPieces(){
    return this.pieces$.asObservable();
  }

  emittedPieces(pieces){
    this.pieces$.next(pieces)
  }
}
