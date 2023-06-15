import React from 'react';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import api from '../../api';
import Loader from '../../components/loader/Loader'
import Message from '../../components/message/Message'
import './PostForm.css';

const PostForm = () => {
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  console.log(userInfo)
  const navigate = useNavigate();

  const [file, setFile] = useState(null);
  const [fileUrl, setFileUrl] = useState(null);
  const [desc, setDesc] = useState('')
  const [loading, setLoading] = useState(false)


  const handleImageChange = (e) => {
      setFile(e.target.files[0]);
      setFileUrl(URL.createObjectURL(e.target.files[0]));
    console.log("file",file)
    console.log("file name",file.name)
    console.log("url",fileUrl)
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    let form_data = new FormData();
    // form_data.append('name', userInfo.name);
    form_data.append('user', userInfo.id);
    form_data.append('desc', desc);
    if (file) {
        form_data.append('image', file, file.name);
    }
    
    console.log("form_data",form_data)
    setLoading(true)
    const res = await api
      .post('/api/posts/create/', form_data, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${userInfo.token}`,
        },
      })
      .then((response) => {
        console.log(response.status, response.data);
        if(response.status == 201) {
          setLoading(false)
          navigate('/profile');
        }
      })
      .catch((err) => {
        console.log(err)
        setLoading(false)
      });

  };
  const isFormValid = !desc && !file;

  return (
    <div className='postForm'>
      <form onSubmit={handleSubmit}>
        <input type='file' name='image' id='' onChange={handleImageChange} />
        <img src={fileUrl} height={100} width={100} />
        <br />
        <input
          type='text'
          name='desc'
          id=''
          placeholder='Description'
          value={desc}
          onChange={(e)=>{setDesc(e.target.value)}}
          />
        <br />
        <div>
        {loading && <Loader />}
        </div>
        <button type='submit' disabled={isFormValid}>Upload</button>
          
      </form>
    </div>
  );
};

export default PostForm;