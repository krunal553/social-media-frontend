import './Posts.css';

import Post from '../post/Post';
import { useEffect, useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { listPosts } from '../../actions/postActions';
import Loader from '../loader/Loader';
import Message from '../message/Message';


const Posts = () => {
  const dispatch = useDispatch();
  const postList = useSelector(state => state.postList);
  const { error, loading, posts } = postList;

  useEffect(() => {
    dispatch(listPosts())
  }, [])

  return (
    <>
      <div className="temp"></div>
      <div className="temp"></div>

      <div className='posts'>
      {loading && <div style={{marginLeft:230}}>
        <Loader />
      </div>
      }
      {error && <Message variant='danger'>{error}</Message>}

        <div>
                  {posts?.map(post => (
            <Post post={post} key={post._id} />
          ))}
        </div>

      </div>
      <div className="temp"></div>
      <div className="temp"></div>
    </>
  )
};

export default Posts
