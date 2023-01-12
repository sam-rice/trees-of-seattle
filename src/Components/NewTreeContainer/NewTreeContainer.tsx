import { useState, FC } from "react"

import "./_NewTreeContainer.scss"
import NewTreeForm from "../NewTreeForm/NewTreeForm"

interface formInputs {
  speciesCommon: string
  speciesSci: string
  address: string
  height: string
  circ: string
  age: string
}

const NewTreeContainer: FC = () => {
  const [isLoading, setIsLoading] = useState(false)
  // const [addressError, setAddressError] = useState<string | null>(null)

  const addTree = async (formInputs: formInputs) => {
    const [lat, lon] = await getCoordinates(formInputs.address)
    console.log("from addTree:", lat, lon)
  }

  const getCoordinates = async (query: string) => {
    const response = await fetch(
      `https://api.geoapify.com/v1/geocode/search?text=${query}%20Seattle%20WA%20USA&apiKey=18e7ab79ca46494ab3da1a3f545a4cc2`
    )
    const data = await response.json()
    const { lat, lon } = data.features[0].properties
    return [lat, lon]
  }

  return (
    <main className="form-main">
      {!isLoading && <NewTreeForm addTree={addTree} />}
      {/* {addressError && (
        <h2>
          Address could not be found. Please try reformatting the address.
        </h2>
      )} */}
    </main>
  )
}

export default NewTreeContainer
