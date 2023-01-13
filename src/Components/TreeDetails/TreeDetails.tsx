import { FC, useState, useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"

import Modal from "react-modal"
import ReactModal from "react-modal"

import "./_TreeDetails.scss"

interface Props {
  findTree: Function
}

const TreeDetails: FC<Props> = ({ findTree }) => {
  const { id } = useParams()
  const [isOpen, setIsOpen] = useState(true)
  const [tree, setTree] = useState({})
  
  const navigate = useNavigate()
  ReactModal.setAppElement("#root")
  
  useEffect(() => {
    setTree(findTree(Number(id)))
  }, [])

  const closeModal = (): void => {
    setIsOpen(false)
    setTimeout(navigate, 400, "/" )
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
      <h1>This tree</h1>
      <button onClick={closeModal}>close</button>

    </Modal>
  )
}

export default TreeDetails