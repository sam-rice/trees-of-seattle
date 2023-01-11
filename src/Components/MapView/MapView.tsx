import { Outlet } from "react-router-dom"

import "./_MapView.scss"

const MapView = () => {
  return (
    <>
      <main className="map-main">
        <div className="map-container">

        </div>
      </main>

      <Outlet />
    </>
  )
}

export default MapView
