import { Role } from "../enum/role-enum";
import { Pokemon } from "./pokemon.model";

export class User {
  firstName: string = "";
  lastName: string = "";
  userName: string = "";
  role: Role = Role.RegularUser;
  password: string = "";
  pokemonIds: Number[] = [];

  copy(): User{
    return Object.assign(new User(),this)
};

  constructor() {
  }

  
}