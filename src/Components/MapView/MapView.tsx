import { Outlet } from "react-router-dom"

import "./_MapView.scss"

const MapView = () => {
  return (
    <>
      <h1>Map View</h1>
      <Outlet />
    </>
  )
}

export default MapView