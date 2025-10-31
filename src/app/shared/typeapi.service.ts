import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TypeapiService {

  constructor(private http: HttpClient) { }

  getTypes$() {
    const url = 'http://localhost:8000/api/types';
    return this.http.get(url);
  }
}
