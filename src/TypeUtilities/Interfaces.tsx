export interface TreeObject {
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

export interface DBTreeObject {
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