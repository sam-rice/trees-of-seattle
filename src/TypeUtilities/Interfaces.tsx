export interface ITree {
  id: number
  speciesCommon: string
  speciesSci: string
  isNative: boolean
  height: number
  circ: number
  age: number
  author: string
  imageURL: string
  address: string
  neighborhood: string
  lat: string
  long: string
}

export interface ITreeDbRow {
  id: number
  species_common: string
  species_sci: string
  is_native: boolean
  height: number
  circ: number
  age: number
  author: string
  img_url: string
  address: string
  neighborhood: string
  lat: string
  long: string
  created_at: string
  updated_at: string
}

export interface IFormInputs {
  speciesCommon: string
  speciesSci: string
  isNative: boolean
  address: string
  height: string
  circ: string
  age: string
  author: string
  imageURL: string
}

export interface IPostBody {
  speciesCommon: string
  speciesSci: string
  isNative: boolean
  address: string
  height: string | null
  circ: string | null
  age: string | null
  author: string
  imageURL: string | null
  neighborhood: string | null
  lat: number
  long: number
}