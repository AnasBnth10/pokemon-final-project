import { CommonModule } from '@angular/common';
import { Component, computed, effect, inject, OnDestroy, signal } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ActivatedRoute, Router } from '@angular/router';
import { map, Subject, switchMap, takeUntil } from 'rxjs';
import { PokemonService } from '../../services/pokemon/pokemon.service';
import { toSignal } from '@angular/core/rxjs-interop';
import { PokemonCardComponent } from "../../components/pokemon-card/pokemon-card.component";
import { MatButtonModule } from '@angular/material/button';
import { IPokemon } from '../../interfaces/pokemon.interface';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { PokemonType } from '../../enum/pokemon-type.enum';
import { MatSelect, MatSelectModule } from '@angular/material/select';
import { Pokemon } from '../../models/pokemon.model';
import { LoginService } from '../../services/login/login.service';
import { Role } from '../../enum/role-enum';

@Component({
  selector: 'app-pokemon-details',
  imports: [MatFormFieldModule, MatInputModule, CommonModule,MatButtonModule, PokemonCardComponent,MatSelectModule,FormsModule,ReactiveFormsModule],
  templateUrl: './pokemon-details.component.html',
  styleUrl: './pokemon-details.component.scss'
})
export class PokemonDetailsComponent implements OnDestroy {
  private activatedRoute = inject(ActivatedRoute);
  private router = inject(Router)
  formBuilder = inject(FormBuilder)
  pokemonService = inject(PokemonService);
  loginService = inject(LoginService);
  destroy$ = new Subject<void>()

  id$ = toSignal(this.activatedRoute.params.pipe(map((p) => p['id'])));

  isAdmin = false
  pokemonAlreadyInList = false

  
  formGroup = this.formBuilder.group({
    id: [-1,[]],
    name: ['Prototype', [Validators.required]],
    img: ['', []],
    type: [PokemonType.Normal, [Validators.required]],
    hp: [0, [Validators.required, Validators.min(1), Validators.max(200)]],
    description: ["",[Validators.required]]
  })

  pokemon : Pokemon = Object.assign(new Pokemon(),this.formGroup.value)

  pokemonTypes = Object.values(PokemonType)

  constructor(){
    effect(() => {
      console.log("effect called")
      if(this.pokemonService.isLoaded()){
        
        if(this.id$())
        {
          const pokemonFound = this.pokemonService.getPokemon(this.id$())
          if(pokemonFound) {
            this.pokemon = pokemonFound
          }
          this.formGroup.patchValue(this.pokemon)
        }
      }

      if(this.loginService.isLoaded()){
        if(this.loginService.currentUser()){
          this.isAdmin = (this.loginService.currentUser()?.role == Role.Admin)
          this.pokemonAlreadyInList = this.loginService.currentUser()!.pokemonIds.includes(this.pokemon.id)

          if(!this.isAdmin){
            this.formGroup.disable()
          }
        }
      }
      
    })

    this.formGroup.valueChanges.pipe(takeUntil(this.destroy$)).subscribe(value => {
      console.log(value)
    this.pokemon = Object.assign(new Pokemon(),value)
    })
  }
  ngOnDestroy(): void {
    this.destroy$.next()
    this.destroy$.complete()
  }


  deletePokemon(id: number) {
    this.pokemonService.deletePokemon(id)
    this.router.navigate(["/home"])
  }

  addPokemonToUser(){
    this.loginService.AddPokemonToUser(this.pokemon.id)
  }

  removePokemonToUser(){
    this.loginService.removePokemonFromUser(this.pokemon.id)
  }

  onFileChange(event: any){
    const reader = new FileReader()
    if(event.target.files && event.target.files.length){
    const [file] = event.target.files;
    reader.readAsDataURL(file);
    reader.onload = () => {
      this.formGroup.patchValue({
        img: reader.result as string
      })
    }
    }
  }

  submit(event: any ){
    event.preventDefault()
    if(this.pokemon.id <= 0){
      this.pokemonService.addPokemonAdmin(this.pokemon)
      this.router.navigate(["/home"])
    }
    else {
      this.pokemonService.updatePokemon(this.pokemon)
      this.router.navigate(["/home"])
    }
  }
}
