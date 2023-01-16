import { FC, useState, useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"

import Modal from "react-modal"
import ReactModal from "react-modal"

import "./_TreeDetails.scss"
import { TreeObject } from "../../TypeUtilities/Interfaces"

interface Props {
  trees: TreeObject[]
}

const TreeDetails: FC<Props> = ({ trees }) => {
  const { id } = useParams()
  const [isOpen, setIsOpen] = useState(true)
  const [tree, setTree] = useState<TreeObject | null>(null)

  const navigate = useNavigate()
  ReactModal.setAppElement("#root")

  useEffect(() => {
    findTree()
  }, [trees])

  const findTree = (): void => {
    setTree(trees.find(tree => tree.id === Number(id)) || null)
  }

  const closeModal = (): void => {
    setIsOpen(false)
    setTimeout(navigate, 400, "/")
  }

  return (
    <Modal
      className="modal"
      isOpen={isOpen}
      closeTimeoutMS={400}
      onRequestClose={closeModal}
      contentLabel="modal"
      shouldCloseOnEsc={true}
      shouldCloseOnOverlayClick={true}
      shouldReturnFocusAfterClose={true}
    >
      {!!tree && (
        <>
          <div className="details-left">
            <div className="details-left__species">
              <h1
                className="details-left__species__common"
                data-cy="details-common"
              >
                {tree.speciesCommon}
              </h1>
              <p
                className="details-left__species__sci"
                data-cy="details-sci"
              >
                {tree.speciesSci}
              </p>
            </div>
            <div
              className="details-left__location"
              data-cy="details-location"
            >
              <p>{tree.address}</p>
              <p className="details-left__location__neighborhood">
                {tree.neighborhood}
              </p>
            </div>
            <table
              className="details-left__table"
              data-cy="details-table"
            >
              <tbody>
                <tr>
                  <td>approx. age:</td>
                  <td>{tree.age} years</td>
                </tr>
                <tr>
                  <td>approx. height:</td>
                  <td>{tree.height} feet</td>
                </tr>
                <tr>
                  <td>base circumference:</td>
                  <td>{tree.circ} inches</td>
                </tr>
                <tr>
                  <td>Washington native:</td>
                  <td>{tree.isNative ? "yes" : "no"}</td>
                </tr>
              </tbody>
            </table>
            <br />
            <p data-cy="details-author">posted by: {tree.author}</p>
          </div>
          <div className="details-right">
            <div className="details-right__img-container">
              <img
                className="details-right__img-container__img"
                src={tree.imageURL}
                data-cy="details-image"
              />
            </div>
          </div>
          <button
            className="modal-close"
            onClick={closeModal}
            data-cy="modal-close"
          >
            close
          </button>
        </>
      )}
    </Modal>
  )
}

export default TreeDetails
