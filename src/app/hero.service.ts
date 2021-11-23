import { Injectable } from '@angular/core';
import { Hero } from './hero';
import { HEROES } from './mock-heroes';
import { Observable, of } from 'rxjs';
import { MessageService } from './message.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class HeroService {

  private heroesURL = 'api/heroes';


  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private httpClient: HttpClient,
    private messageService: MessageService) { }

  getHeroes(): Observable<Hero[]> {
    return this.httpClient.get<Hero[]>(this.heroesURL)
      .pipe(
        tap(_ => this.log('fetched da heroes')),
        catchError(this.handleError<Hero[]>('getHeroes', []))
      )
  }

  getHero(id: number): Observable<Hero> {
    const url = `${this.heroesURL}/${id}`;
    return this.httpClient.get<Hero>(url)
      .pipe(
        tap(_ => this.log(`fetched hero mit der dollen id ${id}`)),
        catchError(this.handleError<Hero>(`fehler beim getten vom hero miter id ${id}`))
      )
  }
  updateHero(hero: Hero): Observable<any> {
    return this.httpClient.put(this.heroesURL, hero, this.httpOptions).pipe(
      tap(_ => this.log(`ubtatet held mid ihde ${hero.id}`)),
      catchError(this.handleError<any>('updateHero'))
    );
  }

  addHero(hero: Hero): Observable<Hero> {
    return this.httpClient.post<Hero>(this.heroesURL, hero, this.httpOptions).pipe(
      tap(newHero => this.log(`added hero with id ${newHero.id}`)),
      catchError(this.handleError<Hero>('addededededHero'))
    )
  }

  deleteHero(id: number): Observable<Hero> {
    const url = `${this.heroesURL}/${id}`;

    return this.httpClient.delete<Hero>(url, this.httpOptions).pipe(
      tap(_ => this.log(`voll gelöscht junge..hahahahaha hahaha hahahahahahhahahhahahhhnhnhnhnhihihi oh man ist das dumm ey hahahaha ${id}`)),
      catchError(this.handleError<Hero>('deleteHero')))
  }

  searchHeroes(term: string): Observable<Hero[]> {
    const url = `${this.heroesURL}/?name=${term}`
    let result: Observable<any> = of([]);

    if (term.trim()) {
      result = this.httpClient.get<Hero[]>(url).pipe(
        tap(x => x.length ? this.log(`hab nen helden jefunden für "${term}"`) :
          this.log(`sorry nix jefunden für "${term}"`)),
        catchError(this.handleError<Hero[]>('searchHeroes', []))
      )
    }
    return result;
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      this.log(`${operation} failed: ${error.message}`);

      return of(result as T);
    }
  }

  private log(message: string) {
    this.messageService.add(`HeroService: ${message}`)
  }

}
