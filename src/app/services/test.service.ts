import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TestService {
  private url = 'https://httpbin.org/status/401';

  constructor(private http: HttpClient) {}

  fetch(): Observable<any> {
    return this.http.get<any>(this.url);
  }
}
