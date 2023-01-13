import { FC } from "react"

import "./_PopupContent.scss"
import { TreeObject } from "../../TypeUtilities/Interfaces"

interface Props {
  data: TreeObject
  goToDetails: Function
}

const PopupContent: FC<Props> = ({ data, goToDetails }) => {
  const {
    id,
    speciesCommon,
    speciesSci,
    height,
    age,
    author,
    img,
    address,
  } = data

  return (
    <div className="popup">
      <div className="popup__left">
        <div className="popup__left__top">
          <h2 className="popup-common">{speciesCommon}</h2>
          <span className="popup-sci">{speciesSci}</span>
          <span className="popup-address">{address}</span>
        </div>
        <table>
          <tbody>
            <tr>
              <td>approx. age:</td>
              <td>{age} years</td>
            </tr>
            <tr>
              <td>approx. height:</td>
              <td>{height} feet</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="popup__right">
        <button 
          className="popup-button"
          onClick={() => goToDetails(id)}
        >view more</button>
        <div className="popup-img-container">
          <img className="popup-img-container__img" src={img} />
        </div>
        <span>posted by: {author}</span>
      </div>
    </div>
  )
}

export default PopupContent
