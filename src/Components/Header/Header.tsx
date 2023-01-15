import { FC } from "react"
import { Link, useLocation } from "react-router-dom"

import "./_Header.scss"

const Header: FC = () => {
  const location = useLocation()

  return (
    <header className="header">
      <nav className="nav">
        <Link
          className="nav__title-wrapper"
          to="/"
        >
          <h1
            className="site-title"
            data-cy="site-title"
          >
            TREES
            <span className="site-title__inner">OF</span>
            SEATTLE
          </h1>
        </Link>
        <Link
          className="nav__button-wrapper"
          to="/new-tree"
        >
          {!location.pathname.includes("/new-tree") && (
            <button
              className="header-button"
              data-cy="new-tree-button"
            >
              new tree
            </button>
          )}
        </Link>
      </nav>
    </header>
  )
}

export default Header
