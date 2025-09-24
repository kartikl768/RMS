import { Link } from "react-router-dom"
import '../../assets/stlyes/managerStyles/Navbar.css';
import fnfLogo from '../../assets/images/Fnf.jpg'


function Navbar() {
  return (
     <nav className="navbar">
      <div className="navbar-logo">
        {/* <img src="/images/Fnf.jpg"/> */}
        <img src={fnfLogo} alt="FNF"></img>
      </div>
      <ul className="navbar-links">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/create">Create Job</Link></li>
        <li><Link to="/profile">Profile</Link></li>
        {/* <li>
          {userEmail ? (
            <span>Signed in as: <strong>{userEmail}</strong></span>
          ) : (
            <Link to="/login">Sign In</Link>
          )}
        </li> */}
      </ul>
    </nav>
  )
}

export default Navbar