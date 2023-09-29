import React, { useState, useEffect, useContext } from "react";
import { Link, useLocation } from 'react-router-dom'
import "./Header.css"; // assuming you have a separate CSS file for your component
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHome, faSearch, faPlusSquare, faHeart, faUser, faComment ,faBinoculars, faRoute } from '@fortawesome/free-solid-svg-icons'

import { DarkModeContext } from '../../context/darkModeContext';
import { FaMoon, FaSun } from 'react-icons/fa';


const Header = () => {
  const location = useLocation()
  const [activeIcon, setActiveIcon] = useState('home')

  useEffect(() => {
    // Update the active icon based on the current URL
    const currentPathname = location.pathname
    if (currentPathname === '/search' || currentPathname === '/search/') {
        setActiveIcon('search')
    } 
}, [location])

  const handleIconClick = (iconName) => {
    setActiveIcon(iconName)
  }

  const [isDarkMode, setIsDarkMode] = React.useState(false);
  const { darkMode, toggle } = useContext(DarkModeContext);

  const handleThemeChange = () => {
    toggle()
  };

  return (
    <div className="header">
      <div className="header__logo">
        <h3>social</h3> 
      </div>
      <div  
        className="header__icons" 
        onClick={handleThemeChange}
        style={{cursor:"pointer"}}
      >
        {!darkMode ? <FaSun /> : <FaMoon />}
        <Link to="/search" className={`bottom-bar-icon ${activeIcon === 'search' ? 'active' : ''}`} onClick={() => handleIconClick('search')}>
                <FontAwesomeIcon icon={faSearch} size="2x" />
            </Link>
      </div>

    </div>
  );
};
export default Header;