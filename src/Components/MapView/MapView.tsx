import { FC } from "react"
import { Outlet } from "react-router-dom"
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet"

import "./_MapView.scss"
import PopupContent from "../PopupContent/PopupContent"
import testData from "../../testData.json"
import { TreeObject } from "../../TypeUtilities/Interfaces"

const MapView: FC = () => {
  const markers = testData.map((tree: TreeObject) => {
    return (
      <Marker 
        position={[Number(tree.lat), Number(tree.long)]} 
        key={tree.id}
      >
        <Popup>
          <PopupContent data={tree} />
        </Popup>
      </Marker>
    )
  })

  return (
    <>
      <main className="map-main">
        <div id="map">
          <MapContainer
            center={[47.626395, -122.329386]}
            zoom={12}
            minZoom={13}
          >
            <TileLayer
              attribution='&copy; <a href="https://stadiamaps.com/">Stadia Maps</a>, &copy; <a href="https://openmaptiles.org/">OpenMapTiles</a> &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors'
              url="https://tiles.stadiamaps.com/tiles/alidade_smooth/{z}/{x}/{y}{r}.png"
            />
            {markers}
          </MapContainer>
        </div>
      </main>

      <Outlet />
    </>
  )
}

export default MapView
