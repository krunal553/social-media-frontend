import React, { useState, useEffect } from "react";
import { FaHome, FaSearch, FaCompass, FaHeart, FaEnvelope, FaSignOutAlt, FaMoon, FaSun } from 'react-icons/fa';
import './sidebar.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHome, faSearch, faPlusSquare, faHeart, faUser, faComments, faBinoculars, faRoute } from '@fortawesome/free-solid-svg-icons'

import { useContext } from 'react';
import { Link, Navigate, useNavigate, useLocation } from 'react-router-dom';
import { DarkModeContext } from '../../context/darkModeContext';
import { useSelector, useDispatch } from 'react-redux'
import { logout } from '../../actions/userActions';
import api from '../../api';

const Sidebar = () => {
  const [collapsed, setCollapsed] = React.useState(false);
  const [isDarkMode, setIsDarkMode] = React.useState(false);
  const location = useLocation()
  const [activeIcon, setActiveIcon] = useState('home')


  const userLogin = useSelector(state => state.userLogin)
  const { userInfo } = userLogin
  const [userProfile, setUserProfile] = useState([]);
  const navigate = useNavigate();
  const url = `http://127.0.0.1:8000`;

  const { darkMode, toggle } = useContext(DarkModeContext);

  const dispatch = useDispatch()

  async function fetchProfile() {
    const config = {
      headers: {
        'Content-type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`
      }
    }

    const { data } = await api.get(
      `/api/users/${userInfo.username}/profile/`,
      config
    )

    setUserProfile(data);

  };



  const handleToggle = () => {
    setCollapsed(!collapsed);
  };

  const handleThemeChange = () => {
    setIsDarkMode(!isDarkMode);
    toggle()
  };

  const handleLogout = () => {
    dispatch(logout())
    navigate('/login')
  };

  useEffect(() => {
    const currentPathname = location.pathname
    if (currentPathname === '/') {
      setActiveIcon('home')
    } else if (currentPathname === '/explore') {
      setActiveIcon('explore')
    } else if (currentPathname === '/create') {
      setActiveIcon('create')
    } else if (currentPathname === '/activity') {
      setActiveIcon('activity')
    } else if (currentPathname === '/profile') {
      setActiveIcon('profile')
    } else if (currentPathname === '/create') {
      setActiveIcon('create')
    }

    fetchProfile();
  }, [location])

  const handleIconClick = (iconName) => {
    setActiveIcon(iconName)
  }

  return (
    <div className={`sidebar ${collapsed ? 'collapsed' : ''}`}>
      <div className="header-content">
        <div className="app-name">Socio</div>
        <div className="searchbar">
          <button>
            <FaSearch />
          </button>
          <input type="text" placeholder="Search" />
        </div>
      </div>
      <div className="user-info">
        <Link to={"/profile"}>
          <div className="profile-image">
            <img src={url+userProfile.profilePic} alt='' />
          </div>
        </Link>
        <div className="user-details">
          <div className="user-name">{userProfile?.username}</div>
          <div className="logout" onClick={handleLogout}>
            <FaSignOutAlt />
            Logout
          </div>
        </div>
      </div>
      <div className="menu-items">
        <ul>
          <li>
            <Link to="/" className={`side-bar-icon ${activeIcon === 'home' ? 'active' : ''}`} onClick={() => handleIconClick('home')}>
              <FaHome />
              Home
            </Link>
          </li>
          <li>
            <Link to="/explore" className={`side-bar-icon ${activeIcon === 'explore' ? 'active' : ''}`} onClick={() => handleIconClick('search')}>
              <FontAwesomeIcon icon={faRoute} /> Explore
            </Link>
          </li>
            <li><Link to="/create" className={`side-bar-icon ${activeIcon === 'create' ? 'active' : ''}`} onClick={() => handleIconClick('create')}>
                <FontAwesomeIcon icon={faPlusSquare}  /> Add
            </Link></li>
          <li>
            <Link to="/activity" className={`side-bar-icon ${activeIcon === 'activity' ? 'active' : ''}`} onClick={() => handleIconClick('activity')}>
              <FaHeart />
              Notifications
            </Link>
          </li>
        </ul>
      </div>
      <div className="footer-content">
        <div className="theme-toggle" onClick={handleThemeChange}>
          {!darkMode ? <FaSun /> : <FaMoon />}
          {darkMode ? 'Light Mode' : 'Dark Mode'}
        </div>
      </div>
      <div className="toggle-button" onClick={handleToggle}>
        <span></span>
        <span></span>
      </div>
    </div>
  );
}

export default Sidebar;
