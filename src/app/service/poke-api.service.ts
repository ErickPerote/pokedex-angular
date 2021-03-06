import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, mapTo, tap } from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class PokeApiService {
  private url: string = 'https://pokeapi.co/api/v2/pokemon/?offset=0&limit=151'


  constructor(private Http: HttpClient) { }

  get apiListAllPokemons(): Observable<any> {
    return this.Http.get<any>(this.url).pipe(
      tap(res => res),
      tap(res => {
        res.results.map((resPokemons: any) => {
         this.apiGetPokemons(resPokemons.url).subscribe(
           res => resPokemons.status = res
         )
        })
      })
    );
  }
  public apiGetPokemons(url: string):Observable<any> {
    return this.Http.get<any>(url).pipe(
      map(
        res => res 
      )
    )
  } 
}
