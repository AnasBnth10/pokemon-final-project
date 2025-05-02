import { PokemonType } from "../enum/pokemon-type.enum";
import { PokemonCardProperties } from "../interfaces/pokemon-card.interface";

export const getPokemonCardProperties = (pokemonType: PokemonType | undefined): PokemonCardProperties => {
  switch (pokemonType) {
    case PokemonType.Electric:
      return {
        color: "#FFD700",
        typeLogo: "electric-icon.png"
      };
    case PokemonType.Grass:
      return {
        color: "#78C850",
        typeLogo: "grass-icon.png"
      };
    case PokemonType.Water:
      return {
        color: "#6890F0",
        typeLogo: "water-icon.png"
      };
    case PokemonType.Fire:
      return {
        color: "#F08030",
        typeLogo: "fire-icon.png"
      };
    case PokemonType.Bug:
      return {
        color: "#A8B820",
        typeLogo: "bug-icon.png"
      };
    case PokemonType.Poison:
      return {
        color: "#A040A0",
        typeLogo: "poison-icon.png"
      };
    case PokemonType.Ground:
      return {
        color: "#E0C068",
        typeLogo: "ground-icon.png"
      };
    case PokemonType.Fairy:
      return {
        color: "#EE99AC",
        typeLogo: "fairy-icon.png"
      };
    case PokemonType.Normal:
      return {
        color: "lightgrey",
        typeLogo: "normal-icon.png"
      };
    default:
      return {
         color: "#A8A878",
        typeLogo: "normal-icon.png"
      };
  }
};
