import { FC, useState } from "react"
import { Outlet, useNavigate } from "react-router-dom"
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet"

import "./_MapView.scss"
import PopupContent from "../PopupContent/PopupContent"
import { ITree } from "../../TypeUtilities/Interfaces"

interface Props {
  trees: ITree[]
}

const MapView: FC<Props> = ({ trees }) => {
  const [filter, setFilter] = useState("")
  const navigate = useNavigate()

  const DEFAULT_MAP_ZOOM = 12
  const TILE_LAYER_ATTRIBUTION =
    '&copy; <a href="https://stadiamaps.com/">Stadia Maps</a>, &copy; <a href="https://openmaptiles.org/">OpenMapTiles</a> &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors'
  const TILE_LAYER_URL =
    "https://tiles.stadiamaps.com/tiles/alidade_smooth/{z}/{x}/{y}{r}.png"

  const goToDetails = (id: string | number): void => {
    navigate(`/${id}`)
  }

  const displayedTrees = filter
    ? trees.filter(
        tree =>
          tree.speciesCommon.toLowerCase().includes(filter.toLowerCase()) ||
          tree.speciesSci.toLowerCase().includes(filter.toLowerCase())
      )
    : trees

  const markers = displayedTrees.map((tree: ITree) => {
    return (
      <Marker
        position={[Number(tree.lat), Number(tree.long)]}
        key={tree.id}
      >
        <Popup minWidth={351}>
          <PopupContent
            data={tree}
            goToDetails={goToDetails}
          />
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
              data-cy="marker-filter"
            />
          </label>
          <button
            className="map-filter__button"
            onClick={() => setFilter("")}
          >
            clear
          </button>
        </div>
        <div id="map">
          <MapContainer
            center={[47.626395, -122.329386]}
            zoom={DEFAULT_MAP_ZOOM}
            minZoom={DEFAULT_MAP_ZOOM}
          >
            <TileLayer
              attribution={TILE_LAYER_ATTRIBUTION}
              url={TILE_LAYER_URL}
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
