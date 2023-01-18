import { useState, FC, useEffect } from "react"
import { useNavigate } from "react-router-dom"

import "./_NewTreeContainer.scss"
import NewTreeForm from "../NewTreeForm/NewTreeForm"
import { cleanTreeObject, formatBody } from "../../CleanerUtilities/cleanTreesData"
import { getCoordinates } from "../../api-calls"
import { FormInputs } from "../../TypeUtilities/Interfaces"

interface Props {
  addTree: Function
}

const NewTreeContainer: FC<Props> = ({ addTree }) => {
  const [addressError, setAddressError] = useState(false)
  const [postError, setPostError] = useState("")

  const navigate = useNavigate()

  useEffect(() => {
    if (postError) navigate("/error")
  }, [postError])

  const postTree = async (formInputs: FormInputs) => {

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
      const response = await fetch(
        "http://localhost:3001/v1/trees",
        // "https://radiant-harbor-65607.herokuapp.com/v1/trees",
        settings
      )

      if (!response.ok) throw Error(response.statusText)
      const newTree = await response.json()
      addTree(cleanTreeObject(newTree))
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
        postTree={postTree}
        addressError={addressError}
      />
    </main>
  )
}

export default NewTreeContainer
