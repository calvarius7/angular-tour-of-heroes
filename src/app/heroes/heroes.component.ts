import { Component, OnInit } from '@angular/core';
import { Hero } from '../hero';
import { HeroService } from '../hero.service';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
export class HeroesComponent implements OnInit {

  heroes: Hero[] = [];

  constructor(private heroService: HeroService) { }

  ngOnInit() {
    this.subscribeHeroes();
  }

  setHeroes(heroes: Hero[]): void {
    this.heroes = heroes;
  }

  subscribeHeroes(): void {
    this.heroService.getHeroes()
      .subscribe(heroes => this.setHeroes(heroes));

  }

  add(name: string): void {
    name = name.trim();
    if (name) {
      this.heroService.addHero({ name } as Hero)
        .subscribe(hero => this.heroes.push(hero));
    }
  }

  delete(hero: Hero): void {
    this.heroService.deleteHero(hero.id).subscribe();
    this.heroes = this.heroes.filter(h => h !== hero);
  }
}

