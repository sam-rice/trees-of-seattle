import React from "react"
import { Routes, Route } from "react-router-dom"

import "./_App.scss"
import Header from "../Header/Header"
import MapView from "../MapView/MapView"
import TreeDetails from "../TreeDetails/TreeDetails"
import NewTreeForm from "../NewTreeForm/NewTreeForm"

const App = () => {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<MapView />}>
          <Route path=":id" element={<TreeDetails />} />
        </Route>
        <Route path="/new-tree" element={<NewTreeForm />} />
      </Routes>
    </>
  )
}

export default App
