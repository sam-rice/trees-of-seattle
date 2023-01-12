import { FC, useState } from "react"

import "./_NewTreeForm.scss"

interface Props {
  addTree: Function
}

const NewTreeForm: FC<Props> = () => {
  const [speciesCommon, setSpeciesCommon] = useState("")
  const [speciesSci, setSpeciesSci] = useState("")
  const [address, setAddress] = useState("")
  const [height, setHeight] = useState("")
  const [circ, setCirc] = useState("")
  const [age, setAge] = useState("")

  const handleSubmit = (e: React.SyntheticEvent): void => {
    e.preventDefault()
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
              />
            </label>
            <label>
              <span className="label-hidden">scientific name:</span>
              <input
                type="text"
                placeholder="scientific name"
                value={speciesSci}
                onChange={e => setSpeciesSci(e.target.value)}
              />
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
              />
              approximate height in feet
            </label>
            <label>
              <input
                type="number"
                placeholder="circumference"
                value={circ}
                onChange={e => setCirc(e.target.value)}
              />
              {"approximate circumference at base of trunk (in.)"}
            </label>
            <label>
              <input
                type="number"
                placeholder="approximate age"
                value={age}
                onChange={e => setAge(e.target.value)}
              />
              approximate age
            </label>
          </div>
        </div>
        <div className="form__top__right">
          <div className="form__top__right__img-frame">
            <input type="file" />
          </div>
        </div>
      </div>
      <button className="form__submit" type="submit">
        SUBMIT
      </button>
    </form>
  )
}

export default NewTreeForm
