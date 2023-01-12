import { FC } from "react"

import "./_NewTreeContainer.scss"
import NewTreeForm from "../NewTreeForm/NewTreeForm"

const NewTreeContainer: FC = () => {

  const addTree = () => {
    
  }

  return (
    <main className="form-main">
      <NewTreeForm addTree={addTree} />
    </main>
  )
}

export default NewTreeContainer
