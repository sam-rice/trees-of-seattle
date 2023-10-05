import { FC } from "react"

import "./_PopupContent.scss"
import { ITree } from "../../TypeUtilities/Interfaces"

interface Props {
  data: ITree
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
    imageURL,
    address,
  } = data

  return (
    <div className="popup">
      <div className="popup__left">
        <div className="popup__left__top">
          <h2 
            className="popup-common"
            data-cy="popup-common"
          >{speciesCommon}</h2>
          <span 
            className="popup-sci"
            data-cy="popup-sci"
          >{speciesSci}</span>
          <span 
            className="popup-address"
            data-cy="popup-address"
          >{address}</span>
        </div>
        <table>
          <tbody>
            <tr>
              <td>approx. age:</td>
              <td>{age} years</td>
            </tr>
            {height && <tr>
              <td>approx. height:</td>
              <td>{height} feet</td>
            </tr>}
          </tbody>
        </table>
      </div>
      <div className="popup__right">
        <button 
          className="popup-button"
          onClick={() => goToDetails(id)}
          data-cy="popup-button"
        >view more</button>
        <div className="popup-img-container">
          {imageURL && <img 
            className="popup-img-container__img" 
            src={imageURL}
            alt={`user-submitted photo of a ${speciesCommon}`}
            data-cy="popup-thumbnail"
          />}
        </div>
        <span data-cy="popup-author">posted by: {author}</span>
      </div>
    </div>
  )
}

export default PopupContent
