import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, filter, map } from 'rxjs';

interface Endpoints {
  api: any;
}

@Injectable({
  providedIn: 'root',
})
export class ConfigService {
  private endpoints = new BehaviorSubject<Endpoints | null>(null);
  readonly api$ = this.endpoints.asObservable().pipe(
    filter((endpoints) => !!endpoints),
    map((endpoints) => endpoints?.api),
  );

  api() {
    return this.endpoints.getValue()?.api;
  }

  constructor(private http: HttpClient) {}

  fetchEndpoints() {
    this.http
      .get<Endpoints>(
        `https://raw.githubusercontent.com/piyalidas10/dummy-json/main/initializer.json`,
      )
      .subscribe({
        next: (endpoints) => this.endpoints.next(endpoints),
        error: () =>
          this.endpoints.next({
            api: [],
          }),
      });
  }
}
