import { ReactElement, useState, FC } from "react"

import "./_NewTreeContainer.scss"
import NewTreeForm from "../NewTreeForm/NewTreeForm"

interface Props {
  addTree: Function
}

interface formInputs {
  speciesCommon: string
  speciesSci: string
  address: string
  height: string
  circ: string
  age: string
  author: string
}

const NewTreeContainer: FC<Props> = ({ addTree }) => {
  const [isLoading, setIsLoading] = useState(false)
  // const [addressError, setAddressError] = useState<string | null>(null)

  const postTree = async (formInputs: formInputs) => {
    const { speciesCommon, speciesSci, address, height, circ, age, author } =
      formInputs
    const [lat, long, district] = await getCoordinates(formInputs.address)

    const body = {
      speciesCommon,
      speciesSci,
      height,
      circ,
      age,
      author,
      address,
      neighborhood: district,
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
    const response = await fetch("http://localhost:3001/v1/trees", settings)
    const newTree = await response.json()
    addTree(newTree)
  }

  const getCoordinates = async (query: string) => {
    const response = await fetch(
      `https://api.geoapify.com/v1/geocode/search?text=${query}%20Seattle%20WA%20USA&apiKey=18e7ab79ca46494ab3da1a3f545a4cc2`
    )
    const data = await response.json()
    const { lat, lon, district } = data.features[0].properties
    return [lat, lon, district]
  }

  return (
    <main className="form-main">
      {!isLoading && <NewTreeForm postTree={postTree} />}
      {/* {addressError && (
        <h2>
          Address could not be found. Please try reformatting the address.
        </h2>
      )} */}
    </main>
  )
}

export default NewTreeContainer
