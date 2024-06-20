import '../Navbar/Navbar.css';
import React, { useEffect, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const [userName, setUserName] = useState(null);
  const navigate = useNavigate();

    

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userName');
    navigate('/login');
  };

  return (
    <div className='Nav'>
      <NavLink to='/'>Home</NavLink>
     
      {localStorage.getItem('userName') ? 
 <NavLink to='/employees'>Employee List</NavLink> :
 ''
}

      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Navbar;
