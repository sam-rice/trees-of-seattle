import { useState, FC } from "react"
import { Routes, Route } from "react-router-dom"

import "./_App.scss"
import Header from "../Header/Header"
import MapView from "../MapView/MapView"
import TreeDetails from "../TreeDetails/TreeDetails"
import NewTreeContainer from "../NewTreeContainer/NewTreeContainer"

import { TreeObject } from "../../TypeUtilities/Interfaces"

const App: FC = () => {
  const [trees, setTrees] = useState<TreeObject[]>([])

  const addTree = (tree: TreeObject): void => {
    setTrees([...trees, tree])
  }

  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<MapView trees={trees}/>}>
          <Route path=":id" element={<TreeDetails />} />
        </Route>
        <Route path="/new-tree" element={<NewTreeContainer addTree={addTree} />} />
      </Routes>
    </>
  )
}

export default App
