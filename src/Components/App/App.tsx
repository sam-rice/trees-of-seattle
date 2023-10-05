import { useState, useEffect, FC } from "react"
import { Routes, Route, useNavigate } from "react-router-dom"

import Header from "../Header/Header"
import MapView from "../MapView/MapView"
import TreeDetails from "../TreeDetails/TreeDetails"
import NewTreePage from "../NewTreePage/NewTreePage"
import ErrorPage from "../ErrorPage/ErrorPage"

import { ITree, ITreeDbRow } from "../../TypeUtilities/Interfaces"
import { cleanTreesData } from "../../CleanerUtilities/cleanTreesData"
import { fetchAllTrees } from "../../apiCalls"

const App: FC = () => {
  const [trees, setTrees] = useState<ITree[]>([])
  const [error, setError] = useState("")
  
  const navigate = useNavigate()

  useEffect(() => {
    getAllTrees()
  }, [])

  useEffect(() => {
    if (error) navigate("/error")
  }, [error])

  const getAllTrees = async () => {
    try {
      const response = await fetchAllTrees()
      if (!response.ok) throw Error(response.statusText)
      const data: ITreeDbRow[] = await response.json()
      setTrees(cleanTreesData(data))
    } catch (error) {
      let message
      if (error instanceof Error) message = error.message
      else message = String(error)
      setError(message)
    }
  }

  const addTreeToState = (tree: ITree) => {
    setTrees([...trees, tree])
  }

  return (
    <>
      <Header />
      <Routes>
        <Route
          path="/"
          element={<MapView trees={trees} />}
        >
          <Route
            path=":id"
            element={<TreeDetails trees={trees} />}
          />
        </Route>
        <Route
          path="/new-tree"
          element={<NewTreePage addTreeToState={addTreeToState} />}
        />
        <Route
          path="/error"
          element={<ErrorPage />}
        />
      </Routes>
    </>
  )
}

export default App
