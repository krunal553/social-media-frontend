import { Link, useNavigate } from 'react-router-dom';

import React, { useState } from 'react';
import api from '../../api';
import Loader from '../../components/loader/Loader'
import Message from '../../components/message/Message'


const Register = () => {

  const navigate = useNavigate();

  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [password2, setPassword2] = useState('');
  const [otp, setOtp] = useState('');
  const [api_otp, setApi_Otp] = useState(null);
  const [otpSent, setOtpSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      setMessage("")
      setLoading(true)
      const response = await api.post('/api/users/verify/', {
        'username': username,
        'email': email,
        'password': password,
        'password2': password2,
      });
      setLoading(false)
      // console.log(response.data.res)
      if (response.data.res === 'ok') {
        const config = {
          headers: {
            'Content-Type': 'application/json'
          }
        }

        const { data } = await api.post(
          '/api/users/send-otp/',
          { 'email': email, },
          config
        )

        setOtpSent(data.success);
        setApi_Otp(data.otp);
      }
      else {
        console.log(response)
        setMessage(response.data.res)
      }
    } catch (error) {
      console.error(error);
      setMessage(error)
    }
  };

  const handleOtpSubmit = async (event) => {
    event.preventDefault();
    try {
      if (otp === api_otp) {
        const response = await api.post('/api/users/signup/', {
          'username': username,
          'email': email,
          'password': password,

        });
      
        navigate('/login');

      if (response.data.success) {
        // console.log('Sign up success!');
        setOtp('');
        navigate('/login')

      }}
    } catch (error) {
      console.error(error);
    }
  };


  return (
    <div className='login'>
            <div className="card">
            <div className="right">

          <h1>Sign Up</h1>
          {message && <Message variant='danger'>{message}</Message> }
          {loading && <Loader />}
          {!otpSent ? (
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Username"
              />
              <input
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
              />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
              />
              <input
                type="password"
                value={password2}
                onChange={(e) => setPassword2(e.target.value)}
                placeholder="Enter Password Again"
              />
              <button type="submit" className="loginBtn">Sign up</button>
            </form>
          ) : (
            <form onSubmit={handleOtpSubmit}>
              <input
                type="text"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                placeholder="OTP"
              />
              <button type="submit" className="loginBtn">Verify OTP</button>
              
            </form>
          )}
          <div className='reg-info'>
          <span>Already have an account?</span>
          <Link to="/login">
            <span style={{textDecoration:'underline'}} className='register'>Login</span>
          </Link>
          </div>
        </div>
        </div>
        </div>
  )
}

export default Register;