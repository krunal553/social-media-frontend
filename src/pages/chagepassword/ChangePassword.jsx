import './ChangePassword.css'
import { useSelector } from 'react-redux'
import api from '../../api'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Loader from '../../components/loader/Loader'
import Message from '../../components/message/Message'


const ChangePassword = () => {

  const [currentPassword, setCurrentPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmNewPassword, setCofirmNewPassword] = useState('')

  const userLogin = useSelector(state => state.userLogin)
  const { userInfo } = userLogin;
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  async function handleChangePassword(e) {
    e.preventDefault();
    const config = {
      headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${userInfo.token}`
          }
    }
    setLoading(true)
    await api.put(
      `/api/users/change_password/`,
      { 
        'current_password': currentPassword,
          'new_password': newPassword,
          'confirm_new_password': confirmNewPassword,
      },
      config
    ) .then((response) => {
      console.log(response)
        setError(response.data.message)
      console.log("message", response.data.message)
      console.log("error", response.data.error)
      setLoading(false)
    }).catch(err => {console.log(err);setLoading(false);setError(err.response.data.error);})


    // if (data.error) {
      // setError(data.error)
    // }
    // setNewPassword('')
    // navigate('/edit-profile')

  }
  return (
    <div className='login'>
    <div className="card">
    <div className="right">
      <h1>Change Password</h1>
      {loading && <Loader />}
      {error && <Message variant='danger'>{error}</Message> }
    <form onSubmit={handleChangePassword}>
            <input
              type="password"
              id="username"
              placeholder='Current password'
              name="email"
              value={currentPassword}
              onChange={(e) => {setCurrentPassword(e.target.value)}}
            />
            <input
              type="password"
              id="password"
              placeholder='New password'
              name="passwd"
              value={newPassword}
              onChange={(e) => {setNewPassword(e.target.value)}}
            />
            <input
              type="password"
              id="password"
              placeholder='Confirm new password'
              name="passwd"
              value={confirmNewPassword}
              onChange={(e) => {setCofirmNewPassword(e.target.value)}}
            />
            <button 
              type="submit" 
              className="loginBtn"
            >
              Change Password
            </button>
          </form>
    </div>
    </div>
 </div>
  )
}

export default ChangePassword