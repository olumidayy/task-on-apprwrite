import OTPInput from 'otp-input-react'
import { useContext } from 'react';
import ForgotPasswordContext from '../../../../../Contexts/AuthContextProvider/ForgotPasswordContext/ForgotPasswordContext';
import ConfirmForgotPasswordContext from '../../../../../Contexts/AuthContextProvider/ForgotPasswordContext/ConfirmForgotPasswordContext/ConfirmForgotPasswordContext';
import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './ConfirmForgotPassword.css'
const ConfirmForgotPassword = () => {
    const confirmOTP_api ='https://task-on-production.up.railway.app/api/auth/confirm-otp'
    const [responseErr, setResponseErr] = useState('')
    const emailCtx = useContext(ForgotPasswordContext)
    const ctx = useContext(ConfirmForgotPasswordContext)
    const navigate = useNavigate()
    const handleSubmit = async()=>{
        const confirmData = {
            email: emailCtx.formData.email,
            otp: ctx.otp
        }
        ctx.handleSubmit().then(async res=>{
            if(res.isValid){
                await axios.post(confirmOTP_api, {...confirmData})
                .then(res=>{
                    if(res.status === 200){
                        navigate('/reset')
                    }
                })
                .catch(error=>{
                    if(error.response.status === 400){
                        setResponseErr('Invalid OTP')
                    }
                })
                
            }
        })

    }
    return ( 
        <div className="card">
            <div className="background confirm-bg"></div>
            <div className="formBlock">
                <div className="div">
                    <div className="confirmEmailForm">
                        <h2>Enter OTP</h2>
                        <div className='myForm confirm'>
                            <p>We've sent a OTP to <span className="dynamicEmail">{emailCtx.formData.email}</span>.</p>
                            <div className="confirmElement">
                                <OTPInput
                                    className='otpInput'
                                    inputStyles={{width:'100%', height:'50px', border: '1.5px solid gray', borderRadius: '0.7rem',marginRight:'unset'}}
                                    value={ctx.otp}
                                    onChange={ctx.setOtp}
                                    autofocus
                                    OTPLength={6}
                                    otpType='number'
                                    disabled={false}
                                    secure
                                />
                                {<small className='otpErr'>{responseErr!== "" && responseErr}{ctx.otpErrors.otp}</small>}
                            </div>
                            <div className="formActions">
                                <button onClick={handleSubmit} className='animated bounce' type='button'>Confirm</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ConfirmForgotPassword;