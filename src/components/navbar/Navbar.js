import { NavLink } from 'react-router-dom'
import './navbar.css'
export default function Navbar() {
  return (
    <nav>
      <h1>Youtube</h1>
      <NavLink className='navlink' to='/'>
        Home
      </NavLink>
      <NavLink className='navlink' to='/about'>
        About
      </NavLink>
    </nav>
  )
}
