import { FC } from "react"
import { Routes, Route } from "react-router-dom"

import "./_App.scss"
import Header from "../Header/Header"
import MapView from "../MapView/MapView"
import TreeDetails from "../TreeDetails/TreeDetails"
import NewTreeContainer from "../NewTreeContainer/NewTreeContainer"

const App: FC = () => {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<MapView />}>
          <Route path=":id" element={<TreeDetails />} />
        </Route>
        <Route path="/new-tree" element={<NewTreeContainer />} />
      </Routes>
    </>
  )
}

export default App
