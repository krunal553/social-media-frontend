import React, { useState } from 'react';
import './EditProfile.css';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import api from '../../api';

function EditProfile() {
  const [profilePic, setProfilePic] = useState(null);
  const [username, setUsername] = useState('');
  const [name, setName] = useState('');
  const [bio, setBio] = useState('');
  const [file, setFile] = useState(null);

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const navigate = useNavigate();

  const handleProfilePicChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(URL.createObjectURL(selectedFile));
      setProfilePic(selectedFile);
    } else {
      setFile(null);
      setProfilePic(null);
    }
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();

    let form_data = new FormData();
    form_data.append('bio', bio);
    form_data.append('name', name);
    form_data.append('username', username);
    form_data.append('profilePic', profilePic);

    api
      .put('/api/users/update_profile/', form_data, {
        headers: {
          'Content-Type': 'multipart/form_data',
          Authorization: `Bearer ${userInfo.token}`,
        },
      })
      .then((response) => {
        console.log(response.status, response.data);
      })
      .catch((err) => console.log(err));


    navigate('/profile')
  };

  return (<>
    <div className="edit-profile">
      <button 
        style={{
          marginTop: 50,
          backgroundColor:'cyan',
          cursor: 'pointer'
        }}
        onClick={()=>{navigate('/changepassword')}}
      >
        Change Password
        </button>

    <form onSubmit={handleSubmit}>
    <img src={file} height={100} width={100} style={{borderRadius:'50%'}} />
      <label>
        Profile Picture:
        <input type="file" name='profilePic' onChange={handleProfilePicChange} />
      </label>
      <br />
      <label>
        Username:
        <input type="text" value={username} onChange={e=>{setUsername(e.target.value)}} />
      </label>
      <br />
      <label>
        Name:
        <input type="text" value={name} onChange={e=>{setName(e.target.value)}} />
      </label>

      <br />
      <label>
        Bio:
        <input type="text" value={bio} onChange={e=>{setBio(e.target.value)}} />
      </label>:
      <br />

      <button type="submit">Save</button>
    </form>
    </div>
    </>
  );
}

export default EditProfile;
