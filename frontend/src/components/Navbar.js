import React from 'react'
import { useAuth } from '../Context/AuthContext'
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
    const navigate = useNavigate()
    const {logout, isloggedin} = useAuth();
  return (
    <nav className="navbar  navbar-dark bg-dark"><div className='container'><a className="navbar-brand" href="#">SchoolMAG</a>
    {isloggedin ? <div><button type="button" onClick={()=>{logout();navigate("/login")}} className="btn btn-outline-light ">Log Out</button>
    <a href='/dashboard'><button type="button" className="btn btn-outline-light ">dashboard</button></a>
    </div> : <button type="button" onClick={(e) => {navigate("/login")}} className="btn btn-outline-light m-2">Log in</button>}
    </div>
    </nav>
  )
}

export default Navbar