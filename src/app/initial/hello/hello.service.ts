import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

// @Injectable({
//   providedIn: 'root'
// })
export class HelloService {

  constructor() { }

 http = inject(HttpClient)

  getPoke(){
    return this.http.get<any>("https://pokeapi.co/api/v2/pokemon");
  }
}
