import { NavLink } from 'react-router-dom'
import './navbar.css'
export default function Navbar({ submit, handleTextChange, search, handleHome }) {
  return (
    <nav>
      <h1>Youtube</h1>
      <NavLink className='navlink' onClick={handleHome} to='/'>
        Home
      </NavLink>
      <NavLink className='navlink' to='/about'>
        About
      </NavLink>
      <div className='inputs'>
        <form onSubmit={submit} className='inputs'>
          <input type='text' id='searchbox' value={search} onChange={handleTextChange} />
          <aside>
            <input type='submit' id='search-btn' value='Search' />
          </aside>
        </form>
      </div>
    </nav>
  )
}
