import React, { useState, useEffect } from 'react';
import './UserProfile.css';
import api from '../../api'

import Loader from '../../components/loader/Loader'
import { Link, useNavigate } from 'react-router-dom';
import { DarkModeContext } from '../../context/darkModeContext';
import { useSelector, useDispatch } from 'react-redux'
import { FaSignOutAlt } from 'react-icons/fa';
import { logout } from '../../actions/userActions';
import Post from '../../components/post/Post'
import Masonry from 'react-masonry-css';

const UserProfile = () => {
  // let u = 'http://127.0.0.1:8000/'
  const [posts, setPosts] = useState([]);
  const [userProfile, setUserProfile] = useState([]);

  const [isMasonryLayout, setIsMasonryLayout] = useState(false);
  const handleLayoutChange = () => {
    setIsMasonryLayout(prevState => !prevState);
  };

  const userLogin = useSelector(state => state.userLogin)
  const { userInfo } = userLogin;

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false)

  
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

  useEffect(() => {
    fetchUserPosts();
    fetchProfile();

  }, [])


  const handleLogout = () => {
    dispatch(logout())
    navigate('/login')
  };

  

  async function fetchUserPosts() {
    const config = {
      headers: {
        'Content-type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`
      }
    }
    setLoading(true)
    const { data } = await api.get(
      `/api/posts/${userInfo.username}/posts`,
      config
      )
      setLoading(false)

    setPosts(data);
  };
  const url = `http://127.0.0.1:8000${userProfile.profilePic}`;

  const breakpoints = {
    default: 4,
    3000: 6,
    2000: 5,
    1200: 3,
    500: 3,
  }


  return (
    <div className="UserProfile">
                <div className="temp" style={{minHeight:'50px'}}></div>
      <div className="details" style={{ display: "flex", flexDirection: 'column', gap: "20px" }} >
        <div className="UserProfile-header">
          <div className="UserProfile-profilePhotoContainer">
            <img src={url} alt='' className="UserProfile-profilePhoto" />
          </div>

          <div className="" style={{ display: "flex", gap: "10px" }}>
            <div className="UserProfile-username">{userProfile?.username}</div>
            <div className="logout" onClick={handleLogout}>
              <FaSignOutAlt />
            </div>
          </div>
          <div className="UserProfile-name">{userProfile?.name}</div>
          <div className="UserProfile-bio">{userProfile?.bio}</div>

          <Link to={"/edit-profile"}>
            <button className="UserProfile-editProfileButton">Edit Profile</button>
          </Link>

        </div>
        <div className="UserProfile-counts">
          <div className="UserProfile-count">
            <span className="UserProfile-countNumber">{posts?.length}</span>
            <span className="UserProfile-countLabel">posts</span>
          </div>
          <div className="UserProfile-count">
            <div className="UserProfile-countNumber">{userProfile?.following_count}</div>
            <span className="UserProfile-countLabel">following</span>
          </div>
          <div className="UserProfile-count">
            <div className="UserProfile-countNumber">{userProfile?.followers_count}</div>
            <span className="UserProfile-countLabel">followers</span>
          </div>
        </div>
      </div>
      <div className="" style={{ display: "flex", flexDirection: 'column' }}>

        <div className="UserProfile-layoutToggle">
          <button className={`UserProfile-layoutButton ${isMasonryLayout ? '' : 'active'}`} onClick={handleLayoutChange}>Vertical</button>
          <button className={`UserProfile-layoutButton ${isMasonryLayout ? 'active' : ''}`} onClick={handleLayoutChange}>Masonry</button>
        </div>
        {loading && <Loader/>}
        {/* </div> */}
        <div className={`UserProfile-posts ${isMasonryLayout ? 'masonry' : ''}`}>
          {isMasonryLayout &&

            <Masonry
              breakpointCols={breakpoints}
              className="my-masonry-grid"
              columnClassName="my-masonry-grid_column"
            >

              {posts && posts.map(post => (
                <div key={post.id} >
                  <Link to={`post/${post._id}`}>
                    <img src={url + post.image} alt="" />
                  </Link>
                </div>
              ))}
            </Masonry>
          }
          {!isMasonryLayout && <div className="">
            {posts.map(post => (
              <Post post={post} key={post._id} />
            ))}
          </div>
          }
        </div>
      </div>
      <div style={{minHeight:"50px"}}></div>
    </div >
  );
};

export default UserProfile;
