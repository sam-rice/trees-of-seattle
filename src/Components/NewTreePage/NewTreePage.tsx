import { useState, FC, useEffect } from "react"
import { useNavigate } from "react-router-dom"

import "./_NewTreePage.scss"
import NewTreeForm from "../NewTreeForm/NewTreeForm"
import {
  cleanTreeObject,
  formatBody,
} from "../../CleanerUtilities/cleanTreesData"
import {
  IFormInputs,
  ITree,
  ITreeDbRow,
} from "../../TypeUtilities/Interfaces"
import { getCoordinates, postTree } from "../../apiCalls"

interface Props {
  addTreeToState: (tree: ITree) => void
}

const NewTreePage: FC<Props> = ({ addTreeToState }) => {
  const [addressError, setAddressError] = useState(false)
  const [postError, setPostError] = useState("")

  const navigate = useNavigate()

  useEffect(() => {
    if (postError) navigate("/error")
  }, [postError, navigate])

  const submitTree = async (formInputs: IFormInputs) => {
    try {
      const geoResponse = await getCoordinates(formInputs.address)
      if (!geoResponse.ok) throw Error(geoResponse.statusText)

      const data = await geoResponse.json()
      const { lat, lon, district, street } = data.features[0].properties
      if (!street) {
        setAddressError(true)
        return
      }

      const body = formatBody(formInputs, district, lat, lon)
      const settings = {
        method: "POST",
        body: JSON.stringify(body),
        headers: {
          "Content-Type": "application/json",
        },
      }
      const response = await postTree(settings)
      if (!response.ok) throw Error(response.statusText)

      const newTree: ITreeDbRow = await response.json()
      addTreeToState(cleanTreeObject(newTree))
      navigate("/")
    } catch (error) {
      let message
      if (error instanceof Error) message = error.message
      else message = String(error)
      setPostError(message)
    }
  }

  return (
    <main className="form-main">
      <NewTreeForm
        submitTree={submitTree}
        addressError={addressError}
      />
    </main>
  )
}

export default NewTreePage
