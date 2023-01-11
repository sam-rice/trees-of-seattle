import { useState } from "react"

import "./_Header.scss"

const Header = () => {
  const [filter, setFilter] = useState("")

  return (
    <header className="header">
      <nav className="nav">
        <h1 className="site-title">
          TREES
          <span className="site-title__inner">OF</span>
          SEATTLE
        </h1>
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
