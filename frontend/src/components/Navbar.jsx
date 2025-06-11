import React from 'react';
import { useNavigate, Link } from 'react-router';


const Navbar = () => {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem('user');
    navigate('/login');
  };

  const user = localStorage.getItem('user');

  return (
    <nav className="shadow-sm navbar navbar-expand-lg navbar-light bg-white">
      <div className="container">
        <Link className="navbar-brand" to="/">Hexlet Chat</Link>
        {user ? (<button type="button" className="btn btn-primary" onClick={logout}>Выйти</button>) : null}
      </div>
    </nav>
  )
}

export default Navbar;
