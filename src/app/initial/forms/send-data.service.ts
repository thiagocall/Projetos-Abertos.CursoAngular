import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SendDataService {

  constructor() { }

  private http = inject(HttpClient);

  send(data: any): Observable<any> {
    return of(data)
  }

}
