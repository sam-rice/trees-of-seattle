import { FC } from "react"

import "./_PopupContent.scss"
import treeImg from "../../assets/himalayan.jpeg"
import { TreeObject } from "../../TypeUtilities/Interfaces"

interface Props {
  data: TreeObject
}

const PopupContent: FC<Props> = ({ data }) => {
  const {
    id,
    speciesCommon,
    speciesSci,
    height,
    circ,
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
