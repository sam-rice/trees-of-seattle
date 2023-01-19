import { useState, FC, useEffect } from "react"
import { useNavigate } from "react-router-dom"

import "./_NewTreeContainer.scss"
import NewTreeForm from "../NewTreeForm/NewTreeForm"
import {
  cleanTreeObject,
  formatBody,
} from "../../CleanerUtilities/cleanTreesData"
import {
  FormInputs,
  PostBody,
  DBTreeObject,
} from "../../TypeUtilities/Interfaces"
import { getCoordinates, postTree } from "../../apiCalls"

interface Props {
  addTreeToState: Function
}

const NewTreeContainer: FC<Props> = ({ addTreeToState }) => {
  const [addressError, setAddressError] = useState(false)
  const [postError, setPostError] = useState("")

  const navigate = useNavigate()

  useEffect(() => {
    if (postError) navigate("/error")
  }, [postError])

  const submitTree = async (formInputs: FormInputs) => {
    try {
      const geoResponse = await getCoordinates(formInputs.address)
      if (!geoResponse.ok) throw Error(geoResponse.statusText)
      const data = await geoResponse.json()
      const { lat, lon, district, street } = data.features[0].properties
      if (!street) {
        setAddressError(true)
        return
      }
      const body: PostBody = formatBody(formInputs, district, lat, lon)
      const settings = {
        method: "POST",
        body: JSON.stringify(body),
        headers: {
          "Content-Type": "application/json",
        },
      }
      const response = await postTree(settings)
      if (!response.ok) throw Error(response.statusText)
      const newTree: DBTreeObject = await response.json()
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

export default NewTreeContainer
