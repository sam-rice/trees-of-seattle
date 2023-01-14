import { FC, useState } from "react"

import "./_NewTreeForm.scss"

interface Props {
  postTree: Function
}

const NewTreeForm: FC<Props> = ({ postTree }) => {
  const [speciesCommon, setSpeciesCommon] = useState("")
  const [speciesSci, setSpeciesSci] = useState("")
  const [isNative, setIsNative] = useState(false)
  const [address, setAddress] = useState("")
  const [height, setHeight] = useState("")
  const [circ, setCirc] = useState("")
  const [age, setAge] = useState("")
  const [author, setAuthor] = useState("")
  const [imageURL, setImageURL] = useState("")


  const handleSubmit = (e: React.SyntheticEvent): void => {
    e.preventDefault()
    postTree({
      speciesCommon,
      speciesSci,
      isNative,
      address,
      height,
      circ,
      age,
      author,
      imageURL
    })
  }

  return (
    <form className="form" onSubmit={e => handleSubmit(e)}>
      <div className="form__top">
        <div className="form__top__left">
          <h1>add a tree:</h1>
          <div className="form__top__left__species-name">
            <h2>Species:</h2>
            <label>
              <span className="label-hidden">common name:</span>
              <input
                type="text"
                placeholder="common name"
                value={speciesCommon}
                onChange={e => setSpeciesCommon(e.target.value)}
                data-cy="form-common"
              />
            </label>
            <label>
              <span className="label-hidden">scientific name:</span>
              <input
                type="text"
                placeholder="scientific name"
                value={speciesSci}
                onChange={e => setSpeciesSci(e.target.value)}
                data-cy="form-sci"
              />
            </label>
            <label>
              <input 
                type="checkbox" 
                checked={isNative}
                onChange={() => setIsNative(!isNative)} 
                data-cy="form-native" 
              />
              native to Washington State?
            </label>
          </div>
          <div className="form__top__left__location">
            <h2>Location:</h2>
            <label>
              <span className="label-hidden">address:</span>
              <input
                type="text"
                placeholder="address"
                value={address}
                onChange={e => setAddress(e.target.value)}
                data-cy="form-address"
              />
              , Seattle, Washington
            </label>
          </div>
          <div className="form__top__left__stats">
            <h2>Size Data:</h2>
            <label>
              <input
                type="number"
                placeholder="approximate height"
                value={height}
                onChange={e => setHeight(e.target.value)}
                data-cy="form-height"
              />
              approximate height in feet
            </label>
            <label>
              <input
                type="number"
                placeholder="circumference"
                value={circ}
                onChange={e => setCirc(e.target.value)}
                data-cy="form-circ"
              />
              {"approximate circumference at base of trunk (in.)"}
            </label>
            <label>
              <input
                type="number"
                placeholder="approximate age"
                value={age}
                onChange={e => setAge(e.target.value)}
                data-cy="form-age"
              />
              approximate age
            </label>
            <label>
              posted by:
              <input
                type="text"
                placeholder="name"
                value={author}
                onChange={e => setAuthor(e.target.value)}
                data-cy="form-author"
              />
            </label>
          </div>
        </div>
        <div className="form__top__right">
          <input 
            type="text" 
            placeholder="image URL" 
            value={imageURL} 
            onChange={e => setImageURL(e.target.value)}
            data-cy="form-image"
          />
          {/* <div className="form__top__right__img-frame">
            <input type="file" />
          </div> */}
        </div>
      </div>
      <button className="form__submit" type="submit">
        SUBMIT
      </button>
    </form>
  )
}

export default NewTreeForm
