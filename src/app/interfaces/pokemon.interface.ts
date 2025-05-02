export interface IPokemon {
    id: number
    moves: Mfe[]
    name: string
    order: number
    sprites: Sprites
    stats: Stat[]
    types: Type[]
    weight: number
}

export interface IPokemonUrlResult {
    count: number,
    next: string,
    results: IPokemonUrl[]
}

export interface IPokemonUrl {
    name: string,
    url: string
}

export interface Mfe {
    move: Move
  }

  export interface Move {
    name: string
    url: string
  }

  export interface Stat {
    base_stat: number
    effort: number
    stat: Stat2
  }
  
  export interface Stat2 {
    name: string
    url: string
  }

  export interface Sprites {
    back_default: string
    back_female: string
    back_shiny: string
    back_shiny_female: string
    front_default: string
    front_female: string
    front_shiny: string
    front_shiny_female: string
    other: Other

  }

  export interface Other {
    dream_world: DreamWorld
    home: Home
    "official-artwork": OfficialArtwork
    showdown: Showdown
  }

  export interface DreamWorld {
    front_default: string
    front_female: any
  }

  export interface Home {
    front_default: string
    front_female: string
    front_shiny: string
    front_shiny_female: string
  }

  export interface OfficialArtwork {
    front_default: string
    front_shiny: string
  }

  export interface Showdown {
    back_default: string
    back_female: string
    back_shiny: string
    back_shiny_female: any
    front_default: string
    front_female: string
    front_shiny: string
    front_shiny_female: string
  }

  export interface Type {
    slot: number
    type: Type2
  }
  
  export interface Type2 {
    name: string
    url: string
  }
