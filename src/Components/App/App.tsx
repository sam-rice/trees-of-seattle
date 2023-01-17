import { useState, useEffect, FC } from "react"
import { Routes, Route, useNavigate } from "react-router-dom"

import Header from "../Header/Header"
import MapView from "../MapView/MapView"
import TreeDetails from "../TreeDetails/TreeDetails"
import NewTreeContainer from "../NewTreeContainer/NewTreeContainer"
import ErrorPage from "../ErrorPage/ErrorPage"

import { TreeObject, DBTreeObject } from "../../TypeUtilities/Interfaces"
import { cleanTreesData } from "../../CleanerUtilities/cleanTreesData"

const App: FC = () => {
  const navigate = useNavigate()
  const [trees, setTrees] = useState<TreeObject[]>([])
  const [error, setError] = useState(null)

  useEffect(() => {
    getAllTrees()
  }, [])

  useEffect(() => {
    if (error) navigate("/error")
  }, [error])

  const getAllTrees = async () => {
    try {
      const response = await fetch("https://radiant-harbor-65607.herokuapp.com/v1/trees")
      if (!response.ok) throw Error(response.statusText)

      const data: DBTreeObject[] = await response.json()
      setTrees(cleanTreesData(data))
    } catch (error: any) {
      setError(error)
    }
  }

  const addTree = (tree: TreeObject): void => {
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
          element={<NewTreeContainer addTree={addTree} />}
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
