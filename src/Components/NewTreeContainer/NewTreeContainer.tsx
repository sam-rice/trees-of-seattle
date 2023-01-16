import { ReactElement, useState, FC } from "react"
import { useNavigate } from "react-router-dom"

import "./_NewTreeContainer.scss"
import NewTreeForm from "../NewTreeForm/NewTreeForm"
import { cleanTreeObject } from "../../CleanerUtilities/cleanTreesData"

interface Props {
  addTree: Function
}

interface FormInputs {
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

const NewTreeContainer: FC<Props> = ({ addTree }) => {
  const [addressError, setAddressError] = useState(false)

  const navigate = useNavigate()

  const postTree = async (formInputs: FormInputs) => {
    const { speciesCommon, speciesSci, isNative, address, height, circ, age, author, imageURL } =
      formInputs
    const [lat, long, district, street] = await getCoordinates(formInputs.address)

    if (!street) {
      setAddressError(true)
      return
    }
    
    const body = {
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
      long: long,
    }
    const settings = {
      method: "POST",
      body: JSON.stringify(body),
      headers: {
        "Content-Type": "application/json",
      },
    }
    console.log("body:", JSON.stringify(body))
    const response = await fetch("http://localhost:3001/v1/trees", settings)
    const newTree = await response.json()
    console.log(newTree)
    // addTree(cleanTreeObject(newTree))
    navigate("/")
  }

  const getCoordinates = async (query: string) => {
    const response = await fetch(
      `https://api.geoapify.com/v1/geocode/search?text=${query}%20Seattle%20WA%20USA&apiKey=18e7ab79ca46494ab3da1a3f545a4cc2`
    )
    const data = await response.json()
    const { lat, lon, district, street } = data.features[0].properties
    return [lat, lon, district, street]
  }

  return (
    <main className="form-main">
      <NewTreeForm postTree={postTree} addressError={addressError}/>
    </main>
  )
}

export default NewTreeContainer
