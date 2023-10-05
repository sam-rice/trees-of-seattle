import {
  ITree,
  ITreeDbRow,
  IFormInputs,
  IPostBody,
} from "../TypeUtilities/Interfaces"

export const cleanTreesData = (trees: ITreeDbRow[]): ITree[] => {
  return trees.map(tree => cleanTreeObject(tree))
}

export const cleanTreeObject = (tree: ITreeDbRow): ITree => ({
  id: tree.id,
  speciesCommon: tree.species_common,
  speciesSci: tree.species_sci,
  isNative: tree.is_native,
  height: tree.height,
  circ: tree.circ,
  age: tree.age,
  author: tree.author,
  imageURL: tree.img_url,
  address: tree.address,
  neighborhood: tree.neighborhood,
  lat: tree.lat,
  long: tree.long,
})

export const formatBody = (
  formInputs: IFormInputs,
  district: string,
  lat: number,
  lon: number
): IPostBody => {
  const {
    speciesCommon,
    speciesSci,
    isNative,
    address,
    height,
    circ,
    age,
    author,
    imageURL,
  } = formInputs

  return {
    speciesCommon,
    speciesSci,
    isNative,
    address,
    height: height ? height : null,
    circ: circ ? circ : null,
    age,
    author,
    imageURL: imageURL ? imageURL : null,
    neighborhood: district ? district : null,
    lat: lat,
    long: lon,
  }
}
