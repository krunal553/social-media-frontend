import './Comments.css';
import gojo from '../../resources/images/gojo.jpg'
import { useEffect, useState } from 'react';
import api from '../../api';
import { Link } from 'react-router-dom'


import { useSelector, useDispatch } from 'react-redux'

const Comments = ({ post, fetchPost }) => {

    const [comments, setComments] = useState([]);
    const [comment, setComment] = useState('');

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    let url = 'http://127.0.0.1:8000'



    const handleChange = (e) => {
        const value = e.target.value;
        setComment(value);
    };


    const handleSubmit = (e) => {
        e.preventDefault();

        if (comment) {
            let form_data = new FormData();
            form_data.append('post_id', post._id);
            form_data.append('user', userInfo.id);
            form_data.append('comment_text', comment);

            api.post("/api/posts/create-comment/", form_data, {
                headers: {
                    'Content-Type': 'multipart/form_data',
                    Authorization: `Bearer ${userInfo.token}`

                }
            })
                .then((response) => {
                    console.log(response.status);
                    fetchPostComments();
                    fetchPost();

                }).catch(err => console.log(err))

        }
        setComment("");
    };

    async function fetchPostComments() {
        // console.log("fetchPosts running")
        const url = `/api/posts/${post._id}/comments`;
        let data = await fetch(url)
        // console.log(data)
        let parsedData = await data.json();
        setComments(parsedData);
        // console.log(parsedData);
    };

    useEffect(() => {
        fetchPostComments();
    }, [])


    return (
        <div className='comments'>
            <hr />
            <div className="write">
                {/* Temp */}
                <img src={gojo} alt="" />
                <form className='post-form' onSubmit={handleSubmit}>
                    <input
                        type="text"
                        name="comment"
                        id=""
                        placeholder='Write a comment...'
                        value={comment}
                        onChange={handleChange}
                    />
                    <button type="submit" onClick={handleSubmit}>Send</button>
                </form>
            </div>
            <div className="comment-list">
                {comments && comments.map((comment) => (
                    <div className="comment" key={comment.id}>
                        <img src={url + comment.profilePic} alt="" />
                        <div className="info">

                            <Link to={`/profile/${comment.user_details.user.username}`} style={{ textDecoration: "none", color: "black" }}>
                                <span>{comment.user_details.name}</span>
                            </Link>

                            <p>{comment.comment_text}</p>
                        </div>
                        <span className='date'>{comment.commented_on}</span>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Comments
