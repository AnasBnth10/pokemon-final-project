import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { LoginService } from '../services/login/login.service';
import { Role } from '../enum/role-enum';

export const notAuthorizedGuard: CanActivateFn = (route, state) => {
  const loginService = inject(LoginService)
  const router = inject(Router)
  if(loginService.currentUser() != null)
  {
    if(loginService.currentUser()!.role != Role.Admin){
      router.navigate(["not-authorized"])
    }
  }
  else{
    router.navigate(["login"])
  }

  return true
};
