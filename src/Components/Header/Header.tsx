import { FC } from "react"
import { Link } from "react-router-dom"

import "./_Header.scss"

const Header: FC = () => {


  return (
    <header className="header">
      <nav className="nav">
        <Link to="/">
          <h1 
            className="site-title"
            data-cy="site-title"
          >
            TREES
            <span className="site-title__inner">OF</span>
            SEATTLE
          </h1>
        </Link>
        <div className="header__right">
          <Link to="/new-tree">
            <button
              className="header-button"
              data-cy="new-tree-button"
            >new tree</button>
          </Link>
        </div>
      </nav>
    </header>
  )
}

export default Header
