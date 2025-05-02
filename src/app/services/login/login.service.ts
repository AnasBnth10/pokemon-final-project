import { Injectable, signal } from '@angular/core';
import { User } from '../../models/user.model';
import { findIndex, from, Observable, of } from 'rxjs';
import * as bcrypt from 'bcryptjs';
import { Role } from '../../enum/role-enum';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  users: User[] = []
  currentUser = signal<User | null>(null)
  isLoaded = signal(false)

  constructor() { 
    this.loadUsers().subscribe(() => {
      this.isLoaded.set(true)
    })
  }

  loadUsers() : Observable<null> {
    const cachedUsers = localStorage.getItem("users")
    const cachedCurrentUser = localStorage.getItem("currentUser")

    if(cachedCurrentUser)
    {
      this.currentUser.set(Object.assign(new User(), JSON.parse(cachedCurrentUser)))
    }

    if(cachedUsers)
    {
      this.users = JSON.parse(cachedUsers) as User[]
      return of(null)
    }
    else{
      return from(this.initUsers())
    }
  }

  async initUsers() : Promise<null> {
    this.users = [
      Object.assign(new User(), {
        firstName: "Ash",
        lastName: "Ketchum",
        role: Role.RegularUser,
        userName: "ash123",
        password: await bcrypt.hash("pikachu", 10),
        pokemonIds: []
      }),
      Object.assign(new User(), {
        firstName: "Misty",
        lastName: "Waterflower",
        role: Role.RegularUser,
        userName: "misty123",
        password: await bcrypt.hash("staryu", 10),
        pokemonIds: []
      }),
      Object.assign(new User(), {
        firstName: "Anas",
        lastName: "Bnth",
        role: Role.Admin,
        userName: "anas123",
        password: await bcrypt.hash("anaspwd", 10),
        pokemonIds: []
      }),
    ];

    localStorage.setItem("users", JSON.stringify(this.users));
    return null
  }

  AddPokemonToUser(id : number){
    if (this.currentUser() === null) return;
    let userCopy = this.currentUser()!.copy()
    if(userCopy){
      userCopy.pokemonIds = userCopy.pokemonIds.includes(id)
      ? userCopy.pokemonIds
      : [...userCopy.pokemonIds, id]
    }
    this.currentUser.set(userCopy)
    this.saveCurrentUser()
  }

  removePokemonFromUser(id: number) {
    if (!this.currentUser()) return;
  
    let userCopy = this.currentUser()!.copy()
    if(userCopy){
      userCopy.pokemonIds = userCopy.pokemonIds.filter(pid => pid !== id)
    }
    this.currentUser.set(userCopy)
    this.saveCurrentUser();
  }

  saveCurrentUser() {
    localStorage.setItem("currentUser",JSON.stringify(this.currentUser()))
    const currentUserIndex = this.users.findIndex(u => u.userName == this.currentUser()?.userName)

    this.users[currentUserIndex] = this.currentUser()!

    localStorage.setItem("users", JSON.stringify(this.users));

  }

  async login(username: string,password:string) : Promise<User | null> {
    let userFound = this.users.find(user => user.userName == username)
    if(userFound){
      const pwdIsCorrect = await bcrypt.compare(password,userFound.password)
      if(pwdIsCorrect)
      {
        this.currentUser.set(userFound)
        this.saveCurrentUser()
        return userFound
      }
    }
    return null
  }

  logout(){
    this.currentUser.set(null)
    this.saveCurrentUser()
  }


}
