import { useState } from 'react';
import './ResetPassword.css';
import api from '../../api';
import Loader from '../../components/loader/Loader'
import Message from '../../components/message/Message'
import { useNavigate } from 'react-router-dom';

const ResetPassword = () => {

    const [email, setEmail] = useState('')
    const [otpSent, setOtpSent] = useState(false);
    const [isEmailValid, setIsEmailValid] = useState(false);
    const [otp, setOtp] = useState('');
    const [api_otp, setApi_Otp] = useState("");
    const [isOtpValid, setIsOtpValid] = useState(false);
    const [newPassword, setNewPassword] = useState("");

    const [loading, setLoading] = useState(false)
    const [message, setMessage] = useState(false)
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage('')
        setLoading(true)
        api
            .post('/api/users/check_email/',
            { 
                'email': email, 
            },
            {
                headers: {
                    'Content-Type': 'application/json'
                },
            })
            .then((response) => {
                console.log(response);
                sendEmailOtp()
                // setLoading(false)
            })
            .catch((err) =>{
                 console.log(err.response.data.message)
                 setLoading(false)
                 setMessage(err.response.data.message)
                 
            })  

    }

    const sendEmailOtp = async (e) => {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        setLoading(true)
        const { data } = await api.post(
            '/api/users/send-otp/',
            { 'email': email, },
            config
        )
        setLoading(false)

        if (data.success) {
            setOtpSent(data.success);
            setApi_Otp(data.otp);
        }
    }

    const handleOtpSubmit = async (e) => {
        e.preventDefault();
        setMessage('')
        setLoading(true)
        // let delay = 1000
        const delay = (ms) => new Promise((resolve)=> setTimeout(resolve,ms));
        const pause = async (ms) => {
            await delay(ms);
        };

        pause(1000).then(()=>{

            setLoading(false)
            
            if (otp === api_otp) {
                setIsEmailValid(true)
            }
            else {
                setMessage('Wrong OTP!!')
            }
        })
    }
    const handleResetPassword = async (e) => {
        e.preventDefault();
        setMessage('')
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        setLoading(true)
        const { data } = await api.post(
            '/api/users/reset_password/',
            {
                'email': email,
                'new_password': newPassword
            },
            config
        )
        setLoading(false)
        setNewPassword('')
        navigate('/login')
    }


    return (
        <div className='login'>

            <div className="card">
                <div className="right">
                    <h1>Reset Password</h1>
                    {loading && <Loader />}
                    {message && <Message variant='danger'>{message}</Message> }

                    <>
                        {!isEmailValid && (!otpSent ? (
                            <form onSubmit={handleSubmit}>
                                <input
                                    type="text"
                                    id="username"
                                    placeholder='Enter Your Email'
                                    name="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />

                                <button
                                    type="submit"
                                    className="loginBtn"
                                >
                                    Send email
                                </button>
                            </form>
                        ) : (
                            <form onSubmit={handleOtpSubmit}>
                                <input
                                    type="text"
                                    value={otp}
                                    onChange={(e) => setOtp(e.target.value)}
                                    placeholder="OTP"
                                />
                                <button type="submit" className="loginBtn">Verify OTP {api_otp}</button>
                            </form>
                        ))}
                    </>
                    <>
                        {
                            isEmailValid && (
                                <form onSubmit={handleResetPassword}>
                                    <input
                                        type="password"
                                        value={newPassword}
                                        onChange={(e) => setNewPassword(e.target.value)}
                                        placeholder="Enter new password"
                                    />
                                    <button type="submit" className="loginBtn">Reset password</button>
                                </form>
                            )
                        }
                    </>
                </div>

            </div>
        </div>
    )
}

export default ResetPassword