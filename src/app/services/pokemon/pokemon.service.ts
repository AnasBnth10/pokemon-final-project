import { inject, Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { forkJoin, map, Observable, of, switchMap, tap } from 'rxjs';
import { Pokemon } from '../../models/pokemon.model';
import { IPokemon, IPokemonUrlResult } from '../../interfaces/pokemon.interface';
import { LoginService } from '../login/login.service';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {

  private http = inject(HttpClient)
  private loginService = inject(LoginService)
  private BASE_URL = "https://pokeapi.co/api/v2/"
  pokemons: Pokemon[] = []
  isLoaded = signal(false)
 

  constructor() { 
    this.loadPokemons().subscribe(() => {
      this.isLoaded.set(true)
    });
  }

  save(){
    localStorage.setItem("pokemons",JSON.stringify(this.pokemons))
  }

  loadPokemons(): Observable<null> {
    const cached = localStorage.getItem("pokemons");
  
    if (cached) {
      const pokemons = JSON.parse(cached) as Pokemon[];
      this.pokemons = pokemons.sort((a,b) => a.type.localeCompare(b.type))
      return of(null); 
    }
    return this.initializePokemons().pipe(
      tap(() => this.save()),
      map(() => null) 
    );
  }

  getPokemon(id: number): Pokemon | undefined {
    const pokemon =  this.pokemons.find((pokemon) => pokemon.id == id)
    if(pokemon) return pokemon
    else return undefined
    
  }

  addPokemonAdmin(pokemon: Pokemon) {
    let maxId = Math.max(...this.pokemons.map(pokemon => pokemon.id))
    pokemon.id = ++maxId
    this.pokemons.push(pokemon)
    this.save() 
  }

  updatePokemon(pokemon: Pokemon) {
    const pokemonIndex =  this.pokemons.findIndex((pokemonFound) => pokemonFound.id == pokemon.id)
    if(pokemonIndex){
      this.pokemons[pokemonIndex] = pokemon
    }
    this.save() 
  }

  deletePokemon(id: number) {
    const pokemonToDeleteIndex = this.pokemons.findIndex(pokemon => pokemon.id === id);

    if (pokemonToDeleteIndex !== -1) {
      this.pokemons.splice(pokemonToDeleteIndex, 1);
      this.save()
    }

  }
 initializePokemons()  {
    return this.http.get<IPokemonUrlResult>(this.BASE_URL + "pokemon?limit=1000").pipe(
      switchMap(result => {
        const urls = result.results.map(pokemonResult => pokemonResult.url)
        const limitedUrls = urls.slice(0, 25);
        const requests = limitedUrls.map(url => this.http.get<IPokemon>(url));
      return forkJoin(requests);
      }),
      tap(pokemons => {
      const mappedPokemons = pokemons.map(pokemon => Pokemon.mapToPokemon(pokemon))
      this.pokemons = mappedPokemons.sort((a,b) => a.type.localeCompare(b.type))
      })
    )
  }
 
}
