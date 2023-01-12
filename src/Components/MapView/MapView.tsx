import { Outlet } from "react-router-dom"
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet"

import "./_MapView.scss"

const MapView = () => {
  return (
    <>
      <main className="map-main">
        <div className="map-container">
        <MapContainer
          center={[47.626395, -122.329386]}
          zoom={12}
          scrollWheelZoom={false}
          style={{height: "50vh"}}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Marker position={[47.606209, -122.332069]}>
            <Popup>
              A pretty CSS3 popup. <br /> Easily customizable.
            </Popup>
          </Marker>
        </MapContainer>
        </div>
      </main>

      <Outlet />
    </>
  )
}

export default MapView
