import './Explore.css';
import React from 'react';
import api from '../../api'

// import Post from '../../components/post/Post';
import { useEffect, useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { listPosts } from '../../actions/postActions';

import Masonry from 'react-masonry-css';
import { Link } from 'react-router-dom';
import Loader from '../../components/loader/Loader'
import Message from '../../components/message/Message'



const Explore = () => {

  const breakpoints = {
    default: 4,
    3000: 6,
    2000: 5,
    1200: 3,
    500: 3,
  }

  const dispatch = useDispatch();
  const postList = useSelector(state => state.postList);
  const userLogin = useSelector(state => state.userLogin)
  const { userInfo } = userLogin;

  // const { error, loading, posts } = postList;
  const [loading, setLoading] = useState(false)
  const [posts, setPosts] = useState([])

  const url = 'http://localhost:8000';
  // const prof_pic = url+`${post.profilePic}`
  // const post_pic = url+`${post.image}`

  async function fetchExplorePosts() {
    const config = {
      headers: {
        'Content-type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`
      }
    }
    setLoading(true)
    const { data } = await api.get(
      `/api/posts/explore/`,
      config
    )
    setLoading(false)

    setPosts(data);
  };

  useEffect(() => {
    fetchExplorePosts()
  }, [])


  return (
    <div className='explore'>
                <div className="temp"></div>
      {/* <Search style={{ position: "sticky", top: "50px", zIndex: "999"}}/> */}
      {loading && <Loader />}
      <Masonry
        breakpointCols={breakpoints}
        className="my-masonry-grid"
        columnClassName="my-masonry-grid_column"
        >
        
        {posts && posts.map((post,index) => (
          <div key={index} >
            {/* <Link to={`post/${post._id}`}> */}
            <img style={{cursor:'pointer'}} src={url + post.image} alt="" />
            {/* </Link> */}
          </div>
        ))}
      </Masonry>
      <div className="temp"> </div>
    </div>

  )
}

export default Explore
