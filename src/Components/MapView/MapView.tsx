import { FC, useState } from "react"
import { Outlet, useNavigate } from "react-router-dom"
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet"

import "./_MapView.scss"
import PopupContent from "../PopupContent/PopupContent"
import { TreeObject } from "../../TypeUtilities/Interfaces"

interface Props {
  trees: TreeObject[]
}

const MapView: FC<Props> = ({ trees }) => {
  const [filter, setFilter] = useState("")
  const navigate = useNavigate()

  const goToDetails = (id: string | number) => {
    navigate(`/${id}`)
  }

  const displayedTrees = filter
    ? trees.filter(
        tree =>
          tree.speciesCommon.toLowerCase().includes(filter.toLowerCase()) ||
          tree.speciesSci.toLowerCase().includes(filter.toLowerCase())
      )
    : trees

  const markers = displayedTrees.map((tree: TreeObject) => {
    return (
      <Marker position={[Number(tree.lat), Number(tree.long)]} key={tree.id}>
        <Popup minWidth={351}>
          <PopupContent data={tree} goToDetails={goToDetails} />
        </Popup>
      </Marker>
    )
  })

  return (
    <>
      <main className="map-main">
        <div className="map-filter">
          <label>
            <span className="label-hidden">filter trees by species name:</span>
            <input
              className="map-filter__input"
              type="text"
              placeholder="filter trees by species"
              value={filter}
              onChange={e => setFilter(e.target.value)}
            />
          </label>
          <button 
            className="map-filter__button"
            onClick={() => setFilter("")}
          >clear</button>
        </div>
        <div id="map">
          <MapContainer
            center={[47.626395, -122.329386]}
            zoom={13}
            minZoom={12}
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
