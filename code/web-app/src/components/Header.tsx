import { FC } from "react"

type HeaderProps = {
  logout: () => void
}
const Header: FC<HeaderProps> = ({
  logout
}) => {
  return <div className="navbar bg-primary text-primary-content">
    <div className="flex-1">
      <a className="btn btn-ghost text-xl">Zubaan</a>
    </div>
    <div className="flex-none">
      <ul className="menu menu-horizontal px-1">
        <li><a onClick={logout}>Logout</a></li>
      </ul>
    </div>
  </div>
}

export default Header
