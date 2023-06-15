import './Post.css';
import { Link, useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'

import { useParams } from "react-router-dom";

import moreIcon from '../../resources/svgs/more.svg';
import sendIcon from '../../resources/svgs/send.svg';
import likeIcon from '../../resources/svgs/like.svg';
import likedIcon from '../../resources/images/liked.png';
import commentIcon from '../../resources/svgs/comment.svg';

import Popup from '../popup/Popup';
import Comments from '../comments/Comments';
import Profile from '../../pages/profile/Profile';

import api from '../../api';
import { useSelector, useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';




const Post = ({ post }) => {
  const location = useLocation();

  const [isVisible, setIsVisible] = useState(false);

  const togglePopUp = () => setIsVisible(!isVisible);

  const handleClose = () => console.log('Popup closed.');

  const [currPost, setCurrPost] = useState(post);

  const [commentOpen, setCommentOpen] = useState(false);
  const [postLike, setPostLike] = useState(false);
  const navigate = useNavigate();

  const url = 'http://localhost:8000';
  const prof_pic = url+`${currPost.user_details.profilePic}`
  const post_pic = url+`${currPost.image}`

  const [isLiked, setIsLiked] = useState();
  const userLogin = useSelector(state => state.userLogin)
  const { userInfo } = userLogin

  const { id } = useParams();

  async function fetchIsLiked() {
    const config = {
      headers: {
        'Content-type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`
      }
    }

    const { data } = await api.get(
      `/api/posts/isliked/${post._id}`,
      config
    )

    setIsLiked(data);

  };

  async function fetchPost() {
    const config = {
      headers: {
        'Content-type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`
      }
    }

    const { data } = await api.get(
      `/api/posts/post/${post._id}`,
      config
    )

    setCurrPost(data);
  }

  async function fetchSinglePost(curr_post_id) {
    const config = {
      headers: {
        'Content-type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`
      }
    }

    const { data } = await api.get(
      `/api/posts/post/${curr_post_id}`,
      config
    )

    setCurrPost(data);
  }

  async function fetchLike() {
    api.post(`/api/posts/like/${post._id}/`, userInfo.name, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`
      }
    })
      .then((response) => {
        fetchIsLiked();
        fetchPost();

      }).catch(err => console.log(err))

  }


  useEffect(() => {


  // check if the path contains explore/post
    const path = window.location.pathname;

    if (path.includes("explore/post")) {
      fetchSinglePost(id);
    }
    fetchIsLiked();
  }, [])

  const handleLike = async () => {
    fetchLike();
  }

  return (
    <div className='post'>
      <div className="container">
        <div className="user">
          <div className="userInfo">
            <img src={prof_pic} alt="image" />
            <div className="details">

              <Link to={`/profile/${currPost?.user_details?.username}`} style={{ textDecoration: "none" }}>
                <span className='name'>{currPost?.user_details.name}</span>
              </Link>

              <span className="date">{currPost?.timestamp}</span>
            </div>
          </div>
          <img src={moreIcon} alt="more" height="25px" width="25px" />

        </div>
        <div className="content">
          <p>{currPost?.desc}</p>
          <img src={post_pic} alt="" onDoubleClick={handleLike} />
        </div>
        <div className="info">
          <div className="item" >
            {isLiked ?
              <img src={likedIcon} alt="liked" height="25px" width="25px" onClick={handleLike} /> :
              <img src={likeIcon} alt="like" height="25px" width="25px" onClick={handleLike} />
            }{currPost.likes_count} likes
          </div>
          <div className="item" onClick={() => setIsVisible(!isVisible)}>
            <img src={commentIcon} alt="comment" height="25px" width="25px" />
            {currPost?.comments_count} Comments
          </div>
          <div className="item">
            <img src={sendIcon} alt="shares" height="25px" width="25px" />
          </div>
        </div>
          {isVisible && <Comments post={post} fetchPost={fetchPost} />}
      </div>
    </div>
  )
}

export default Post
