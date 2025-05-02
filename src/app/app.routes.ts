import { Routes } from '@angular/router';
import { PokemonDetailsComponent } from './pages/pokemon-details/pokemon-details.component';
import { LoginComponent } from './login/login/login.component';
import { isLoggedInGuard } from './guards/is-logged-in.guard';
import { AllPokemonsComponent } from './pages/all-pokemons/all-pokemons.component';
import { notAuthorizedGuard } from './guards/not-authorized.guard';
import { NotAuthorizedComponent } from './pages/not-authorized/not-authorized.component';
import { MyPokemonsComponent } from './pages/my-pokemons/my-pokemons.component';

export const routes: Routes = [
    {
        path: "home",
        component: AllPokemonsComponent,
        canActivate: [isLoggedInGuard]
    },
    {
        path: "login",
        component: LoginComponent
    },
    {
        path: "not-authorized",
        component: NotAuthorizedComponent
    },
    {
        path: "my-pokemons",
        component: MyPokemonsComponent,
        canActivate: [isLoggedInGuard]
    },
    {
        path: "pokemon",
        children: [
          {
            path: "",
            component: PokemonDetailsComponent,
            canActivate: [isLoggedInGuard,notAuthorizedGuard]
          },
          {
            path: ":id",
            component: PokemonDetailsComponent,
            canActivate: [isLoggedInGuard]
          }
        ]
      },
      {
        path: "**",
        redirectTo: "home" 
      }
];
