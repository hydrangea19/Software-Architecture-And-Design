import React from 'react';
import  './Header.css';
 import { Link } from 'react-router-dom';

function Header () {
  return (
    <header className="header">
     

<nav className="navigation">
  <Link to="/" className="navItem">Home</Link>
    <Link to="/issuers" className="navItem">Issuers List</Link>
  <Link to="/data-analysis" className="navItem">Data Analysis</Link>
  <Link to="/reports" className="navItem">Reports</Link>
  <Link to="/profile" className="navItem">Profile</Link>

</nav>

    </header>
  );
}
export default Header;