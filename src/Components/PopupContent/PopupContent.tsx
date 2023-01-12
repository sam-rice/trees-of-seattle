import { FC } from "react"

import "./_PopupContent.scss"
import treeImg from "../../assets/himalayan.jpeg"

interface Props {
  data: {
    id: string
    speciesCommon: string
    speciesTaxo: string
    height: string
    age: string
    author: string
    img: string
    address: string
    neighborhood: string
    lat: string
    long: string
  }
}

const PopupContent: FC<Props> = ({ data }) => {
  const {
    id,
    speciesCommon,
    speciesTaxo,
    height,
    age,
    author,
    img,
    address,
    neighborhood,
  } = data

  return (
    <div>
      species: {speciesCommon}
      height: {height}
    </div>
  )
}

export default PopupContent
