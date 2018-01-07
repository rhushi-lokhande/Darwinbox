import { Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { observable } from 'rxjs/symbol/observable';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
@Injectable()
export class DataService {
    constructor(private http: HttpClient) { }
    addMove(move): Observable<any> {
        const url = `/api/move`;
        return this.http.post(url, move);
    }
    startNewGame() {
        const url = `/api/start`;
        return this.http.get(url);
    }
    getAllGames() {
        return this.http.get('/api/games');
    }
    winOrDrawGame(data) {
        return this.http.post('/api/winOrDrawGame', data);
    }
}
