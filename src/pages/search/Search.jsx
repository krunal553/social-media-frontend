import React, { useState, useEffect } from 'react';
import './Search.css'
import { useSelector, useDispatch } from 'react-redux'
import api from '../../api';
import { Link } from 'react-router-dom';
import Loader from '../../components/loader/Loader'
import Message from '../../components/message/Message'
import { FaSearch } from 'react-icons/fa';


const Search = () => {

    const [searchResult, setSearchResult] = useState([]);
    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin;
    const url = `http://127.0.0.1:8000`;

    const [loading, setLoading] = useState(false)

    async function fetchSearchResult() {
        const config = {
            headers: {
                'Content-type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }
        setLoading(true)
        const { data }  = await api.get(
            `/api/users/search/?username=admin`,
            config
        )
        setLoading(false)
        setSearchResult(data.user_list);
    };

    useEffect(() => {
        fetchSearchResult();
    }, [])

    return (
        <div className='search-container'>
<div className="searchbar">
          <button>
            <FaSearch />
          </button>
          <input type="text" placeholder="Search" />
        </div>
             {loading && <Loader />}
            {searchResult.map(notification => (
                <div className='search' key={notification.id} >
                    <div className='user-time' >
                        <Link to={`/profile/${notification.username}`} style={{ textDecoration: "none" }}>
                            <img src={url + notification.profilePic} alt="User profile pic" />
                        </Link>
                    </div>
                    <div className='seach-message' style={{display:"flex",flexDirection:'column'}}> 
                        <span style={{ fontWeight: 'bolder' }}> 
                            {notification.username} 
                        </span>
                        <span> 
                            {notification.name} 
                        </span> 
                    </div>
                </div>
            ))}
        </div>
    );
};

export default Search;