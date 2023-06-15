import React from 'react';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import './PostForm.css';

const PostForm = () => {
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  console.log(userInfo)
  const navigate = useNavigate();

  const [file, setFile] = useState();
  const [data, setData] = useState({
    name: userInfo.userProfile.name,
    desc: '',
    image: null,
  });

  const handleChange = (e) => {
    const value = e.target.value;
    setData({
      ...data,
      [e.target.name]: value,
    });
  };

  const handleImageChange = (e) => {
    setFile(URL.createObjectURL(e.target.files[0]));
    setData({
      ...data,
      image: e.target.files[0],
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("form_data",form_data)

    let form_data = new FormData();
    // form_data.append('name', userInfo.name);
    form_data.append('user', userInfo.id);
    form_data.append('desc', data.desc);
    form_data.append('image', data.image, data.image.name);

    axios
      .post('http://127.0.0.1:8000/api/posts/create/', form_data, {
        headers: {
          'Content-Type': 'multipart/form_data',
          Authorization: `Bearer ${userInfo.token}`,
        },
      })
      .then((response) => {
        console.log(response.status, response.data);
        if(response.status == 201) {
          navigate('/profile');
        }
      })
      .catch((err) => console.log(err));

  };

  return (
    <div className='postForm'>
      <form onSubmit={handleSubmit}>
        <input type='file' name='image' id='' onChange={handleImageChange} />
        <img src={file} height={100} width={100} />
        <br />
        <input
          type='text'
          name='desc'
          id=''
          placeholder='Description'
          value={data.desc}
          onChange={handleChange}
        />
        <br />
        <button type='submit'>Upload</button>
      </form>
    </div>
  );
};

export default PostForm;