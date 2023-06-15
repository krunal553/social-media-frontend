import React from 'react'
import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHome, faSearch, faPlusSquare, faHeart, faUser } from '@fortawesome/free-solid-svg-icons'
import './bottomBar.css'

const BottomBar = () => {
    const location = useLocation()
    const [activeIcon, setActiveIcon] = useState('home')

    useEffect(() => {
        // Update the active icon based on the current URL
        const currentPathname = location.pathname
        if (currentPathname === '/') {
            setActiveIcon('home')
        } else if (currentPathname === '/explore' || currentPathname === '/explore/') {
            setActiveIcon('explore')
        } else if (currentPathname === '/create' || currentPathname === '/create/') {
            setActiveIcon('create')
        } else if (currentPathname === '/activity' || currentPathname === '/activity/') {
            setActiveIcon('activity')
        } else if (currentPathname === '/profile' || currentPathname === '/profile/') {
            setActiveIcon('profile')
        }
    }, [location])


    const handleIconClick = (iconName) => {
        setActiveIcon(iconName)
    }
    return (
        <div className="bottom-bar">
            <Link to="/" className={`bottom-bar-icon ${activeIcon === 'home' ? 'active' : ''}`} onClick={() => handleIconClick('home')}>
                <FontAwesomeIcon icon={faHome} size="2x" />
            </Link>
            <Link to="/explore" className={`bottom-bar-icon ${activeIcon === 'explore' ? 'active' : ''}`} onClick={() => handleIconClick('search')}>
                <FontAwesomeIcon icon={faSearch} size="2x" />
            </Link>
            <Link to="/create" className={`bottom-bar-icon ${activeIcon === 'create' ? 'active' : ''}`} onClick={() => handleIconClick('create')}>
                <FontAwesomeIcon icon={faPlusSquare} size="2x" />
            </Link>
            <Link to="/activity" className={`bottom-bar-icon ${activeIcon === 'activity' ? 'active' : ''}`} onClick={() => handleIconClick('activity')}>
                <FontAwesomeIcon icon={faHeart} size="2x" />
            </Link>
            <Link to="/profile" className={`bottom-bar-icon ${activeIcon === 'profile' ? 'active' : ''}`} onClick={() => handleIconClick('profile')}>
                <FontAwesomeIcon icon={faUser} size="2x" />
            </Link>
        </div>
    )

}

export default BottomBar;