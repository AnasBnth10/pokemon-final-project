import { Component, computed, effect, inject, signal } from '@angular/core';
import { PokemonType } from '../../enum/pokemon-type.enum';
import { PokemonService } from '../../services/pokemon/pokemon.service';
import { Pokemon } from '../../models/pokemon.model';
import { PokemonCardComponent } from '../../components/pokemon-card/pokemon-card.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { PokemonListComponent } from "../../components/pokemon-list/pokemon-list.component";

@Component({
  selector: 'app-all-pokemons',
  imports: [FormsModule, CommonModule, MatFormFieldModule, MatInputModule, MatIconModule, FormsModule, MatSelectModule, PokemonListComponent],
  templateUrl: './all-pokemons.component.html',
  styleUrl: './all-pokemons.component.scss'
})
export class AllPokemonsComponent {

  pokemonService = inject(PokemonService)
  initialPokemons = signal<Pokemon[]>([])
  selectedType = signal("")
  pokemonTypes = Object.values(PokemonType)
  search = signal("")

  filteredPokemons = computed(() => {
    return this.initialPokemons().filter(pokemon => pokemon.name.toLowerCase().includes(this.search().toLowerCase()) && (
      this.selectedType() === '' ||
      pokemon.type === this.selectedType()
    ))
  })

  constructor(){
    effect(() => {
      if(this.pokemonService.isLoaded())
      {  
        this.initialPokemons.set(this.pokemonService.pokemons)
      }
  })
}

 
  title = 'pokemon-final-project';


  
}

