import { Component, inject } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { LoginService } from '../../services/login/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  imports: [MatButton],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {
  loginService = inject(LoginService)
  router = inject(Router)

logout(){
  console.log("logout")
this.loginService.logout()
this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
  this.router.navigate(['my-pokemons']);
});
}
}
