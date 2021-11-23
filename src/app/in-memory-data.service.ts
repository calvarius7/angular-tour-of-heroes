import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Hero } from './hero';

@Injectable({
  providedIn: 'root',
})
export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const heroes = [
      { id: 11, name: 'Strong girl'},
      { id: 12, name: 'Long girl'},
      { id: 13, name: 'Fast girl'},
      { id: 14, name: 'Clever girl'},
      { id: 15, name: 'Laser girl'},
      { id: 16, name: 'Flying girl'},
      { id: 17, name: 'Invisible girl'},
      { id: 18, name: 'Boring girl'}
    ];
    return {heroes};
  }

  // Overrides the genId method to ensure that a hero always has an id.
  // If the heroes array is empty,
  // the method below returns the initial number (11).
  // if the heroes array is not empty, the method below returns the highest
  // hero id + 1.
  genId(heroes: Hero[]): number {
    return heroes.length > 0 ? Math.max(...heroes.map(hero => hero.id)) + 1 : 11;
  }
}