import { Component, effect, inject, signal } from '@angular/core';
import { LoginService } from '../../services/login/login.service';
import { Pokemon } from '../../models/pokemon.model';
import { PokemonService } from '../../services/pokemon/pokemon.service';
import { PokemonListComponent } from "../../components/pokemon-list/pokemon-list.component";

@Component({
  selector: 'app-my-pokemons',
  imports: [PokemonListComponent],
  templateUrl: './my-pokemons.component.html',
  styleUrl: './my-pokemons.component.scss'
})
export class MyPokemonsComponent {
 loginService = inject(LoginService)
 pokemonService = inject(PokemonService)
 myPokemons = signal<Pokemon[]>([])


 constructor(){
  effect(() => {
    if(this.loginService.isLoaded() && this.pokemonService.isLoaded()){
      const allPokemons = new Map<Number,Pokemon>(this.pokemonService.pokemons.map(pokemon => [pokemon.id,pokemon]))
      this.myPokemons.set(this.loginService.currentUser()!.pokemonIds.map(id => allPokemons.get(id)).filter(pokemon => pokemon != undefined))
    }
  })
 }
}
