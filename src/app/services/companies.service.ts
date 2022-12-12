import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CompaniesService {

  headers = new HttpHeaders({'Content-Type': 'application/json'});

  constructor(private http: HttpClient) {
  }

  list() {
    return this.http.get('https://test.wertkt.com/api/biz/', {headers: this.headers});
  }

  getById(id: string) {
    return this.http.get('https://test.wertkt.com/api/biz/' + id + '/', {headers: this.headers});
  }
}
