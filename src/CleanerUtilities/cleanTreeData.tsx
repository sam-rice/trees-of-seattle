import { TreeObject, DBTreeObject } from "../TypeUtilities/Interfaces"

const cleanTreeData = (data: DBTreeObject[]): TreeObject[] => {
  return data.map(tree => ({
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
  }))
}

export default cleanTreeData
