import {
  Component,
  computed,
  inject,
  input,
  Input,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { Pokemon } from '../../models/pokemon.model';
import { getPokemonCardProperties } from '../../utils/pokemon.util';
import { CommonModule } from '@angular/common';
import { PokemonService } from '../../services/pokemon/pokemon.service';
import { IPokemon } from '../../interfaces/pokemon.interface';
import { PokemonType } from '../../enum/pokemon-type.enum';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pokemon-card',
  imports: [MatCardModule, MatButtonModule, MatIconModule, CommonModule],
  templateUrl: './pokemon-card.component.html',
  styleUrl: './pokemon-card.component.scss',
})
export class PokemonCardComponent {

  pokemonService = inject(PokemonService)
  router = inject(Router)
  //Old way with implementation of OnChanges interface
  /*
  ngOnChanges(changes: SimpleChanges): void {
    if(changes['title']){
      this.countTitleChanged++;
    }
  }
    */
  pokemon = input<Pokemon>()
  cardProperties = computed(() => {
    return getPokemonCardProperties(this.pokemon()?.type);
  });


  title = input('');
  count = 0;
  countTitleChanged = computed(() => {
    const titleChanged = this.title();

    return ++this.count;
  });

  viewPokemonDetails(id: Number) {
    this.router.navigate(["/pokemon/" + id])
  }
}
