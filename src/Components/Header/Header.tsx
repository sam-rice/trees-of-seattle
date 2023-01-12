import { useState, FC } from "react"
import { Link } from "react-router-dom"

import "./_Header.scss"

const Header: FC = () => {
  const [filter, setFilter] = useState("")

  return (
    <header className="header">
      <nav className="nav">
        <Link to="/">
          <h1 className="site-title">
            TREES
            <span className="site-title__inner">OF</span>
            SEATTLE
          </h1>
        </Link>
        <div className="header__right">
          <input
            type="text"
            value={filter}
            onChange={e => setFilter(e.target.value)}
          />
          <button >tree</button>
        </div>
      </nav>
    </header>
  )
}

export default Header
