import { useState, useEffect, FC } from "react"
import { Routes, Route } from "react-router-dom"

import "./_App.scss"
import Header from "../Header/Header"
import MapView from "../MapView/MapView"
import TreeDetails from "../TreeDetails/TreeDetails"
import NewTreeContainer from "../NewTreeContainer/NewTreeContainer"

import { TreeObject, DBTreeObject } from "../../TypeUtilities/Interfaces"
import { cleanTreesData } from "../../CleanerUtilities/cleanTreesData"

const App: FC = () => {
  const [trees, setTrees] = useState<TreeObject[]>([])

  useEffect(() => {
    getAllTrees()
  }, [])

  const getAllTrees = async () => {
    const response = await fetch("http://localhost:3001/v1/trees")
    const data: DBTreeObject[] = await response.json()
    setTrees(cleanTreesData(data))
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
      </Routes>
    </>
  )
}

export default App
