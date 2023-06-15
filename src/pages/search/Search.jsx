import React, { useState, useEffect } from 'react';
import './Search.css'
import { useSelector, useDispatch } from 'react-redux'
import api from '../../api';
import { Link } from 'react-router-dom';
import Loader from '../../components/loader/Loader'
import Message from '../../components/message/Message'


const Search = () => {

    const [notificationsData, setNotificationsData] = useState([]);
    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin;
    const url = `http://127.0.0.1:8000`;

    const [loading, setLoading] = useState(false)

    async function fetchNotificationsData() {
        const config = {
            headers: {
                'Content-type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }
        setLoading(true)
        const { data } = await api.get(
            `/api/notifications/`,
            config
        )
        setLoading(false)
        setNotificationsData(data);
    };

    useEffect(() => {
        fetchNotificationsData();
    }, [])

    return (
        <div className='search-container'>

            <h2>Search {loading && <Loader />}</h2>
            {notificationsData.map(notification => (
                <div className='search' key={notification.id} >
                    <div className='user-time' >
                        <Link to={`/profile/${notification.created_by.username}`} style={{ textDecoration: "none" }}>
                            <img src={url + notification.created_by.profilePic} alt="User profile pic" />
                        </Link>
                    </div>
                    <div className='seach-message' style={{display:"flex",flexDirection:'column'}}> 
                        <span style={{ fontWeight: 'bolder' }}> 
                            {notification.created_by.name} 
                        </span>
                        <span> 
                            {notification.created_by.name} 
                        </span> 
                    </div>
                </div>
            ))}
        </div>
    );
};

export default Search;