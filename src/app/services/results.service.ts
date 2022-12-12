import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ResultsService {

  headers = new HttpHeaders({'Content-Type': 'application/json'});

  constructor(private http: HttpClient) {
  }

  list() {
    return this.http.get('https://test.wertkt.com/api/result/', {headers: this.headers});
  }

  getById(id: Number) {
    return this.http.get('https://test.wertkt.com/api/result/' + id + '/', {headers: this.headers});
  }
}
