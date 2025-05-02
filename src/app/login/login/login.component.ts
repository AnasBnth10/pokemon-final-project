import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Subject } from 'rxjs';
import { LoginService } from '../../services/login/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [MatFormFieldModule, MatInputModule,MatButtonModule,ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  formBuilder = inject(FormBuilder)
  router = inject(Router)
  loginService = inject(LoginService);
  destroy$ = new Subject<void>()
  errorOnLogging = signal(false)
  


  
  formGroup = this.formBuilder.group({
    username: ['', [Validators.required]],
    password: ['', [Validators.required,Validators.minLength(5)]],
  })

  async submit(event:any){
    event.preventDefault()
    let userLoggedIn = await this.loginService.login(this.formGroup.get("username")!.value!,this.formGroup.get('password')!.value!)
    if(!userLoggedIn){
      this.errorOnLogging.set(true)
    }
    else {
      this.router.navigate(["home"])
    }
    
  }

}
