import { PokemonType } from "../enum/pokemon-type.enum"
import { IPokemon } from "../interfaces/pokemon.interface"

export class Pokemon {
    id: number = -2
    name: string = "Pikachu"
    hp: number = 60
    type: PokemonType = PokemonType.Electric
    img: string = ""
    description: string = ""

    static mapToIPokemon(data: any): IPokemon {
        return {
          id: data.id,
          name: data.name,
          order: data.order,
          weight: data.weight,
          moves: data.moves,
          stats: data.stats,
          sprites: data.sprites,
          types: data.types
        };
      }

      static mapToPokemon(data: IPokemon): Pokemon {
        return {
          id: data.id,
          name: data.name,
          hp: data.stats[0].base_stat,
          img: data.sprites.other["official-artwork"].front_default,
          type: data.types[0].type.name as PokemonType,
          description: "The Shiba Inu is the smallest of the six original and distinct spitz breeds of dog from Japan. A small, agile dog that copes very well with mountainous terrain, the Shiba Inu was originally bred for hunting."
        };
      }
}

