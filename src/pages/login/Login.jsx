import './Login.css';
import { Link, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { login } from '../../actions/userActions'

import Loader from '../../components/loader/Loader'
import Message from '../../components/message/Message'


const Login = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch()

  const userLogin = useSelector( state => state.userLogin )
  const { error, loading, userInfo } = userLogin

  useEffect(() => {
    if (userInfo) {
      navigate('/')
    }
  })

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(login(email, password))

    setEmail("");
    setPassword("");
  }


  return (
    <div className='login'>

      <div className="card">
        <div className="right">
          <h1>Login</h1>
          {error && <Message variant='danger'>{error}</Message> }
          {loading && <Loader />}
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              id="username"
              placeholder='Usernname'
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              id="password"
              placeholder='Password'
              name="passwd"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button 
              type="submit" 
              disabled={!email && !password} 
              className="loginBtn"
            >
              Login
            </button>
            <span className='register'  onClick={()=>{navigate('/resetpassword')}}>forgot password?</span>
          </form>
          <div className='reg-info'>
          <span>Don't you have an account?</span>
          <Link to="/register">
            <span className='register'>Register</span>
          </Link>
          </div>
        </div>
        
      </div>

    </div>
  )
}

export default Login
