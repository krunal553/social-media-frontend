import React, { useState, useEffect } from 'react';
import './Notifications.css'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom';
import Loader from '../../components/loader/Loader'
import Message from '../../components/message/Message'

import api from '../../api'

const Notifications = () => {

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
    <div className='notifications-container'>
      
      <h2>Notifications {loading && <Loader />}</h2>
      {notificationsData.map(notification => (
        <div  className='notification' key={notification.id} >
            <div className='user-time' >
            <Link to={`/profile/${notification.created_by.username}`} style={{ textDecoration: "none" }}>
          <img src={ url + notification.created_by.profilePic} alt="User profile pic" />
              </Link>
          <div className='notification-timestamp'>{notification.created_at}</div>
          </div>
          <div className='notification-message'> <span style={{ fontWeight: 'bolder' }}> {notification.created_by.name} </span> {notification.message}</div>
        </div>
      ))}
    </div>
  );
};

export default Notifications;