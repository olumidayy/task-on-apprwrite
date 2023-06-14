import './ConfirmEmail.css'
import OTPInput from 'otp-input-react'
import { useState } from 'react';
import { useContext } from 'react';
import SignUpContext from '../../../../../Contexts/AuthContextProvider/SignUpContext/SignUpContext';
import ValidateConfirmEmail from './ValidateConfirmEmail';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
const ConfirmEmail = () => {
    const ctx = useContext(SignUpContext)
    const navigate = useNavigate()
    const confirmEmail_api ='https://task-on-production.up.railway.app/api/auth/verify-email'
    const [myOtp,setMyOtp] = useState('')
    const [responseErr, setResponseErr] = useState('')
    const [errors,setErrors] = useState({})
    const handleSubmit = async () => {
        const validateDetails = {
            email: ctx.formData.email,
            otp: myOtp
        }
        const OTPErrors = ValidateConfirmEmail(myOtp)
        setErrors(OTPErrors)
        if(OTPErrors.all === ""){
            await axios.post(confirmEmail_api, {...validateDetails})
            .then(res=>{
                if(res.status === 200){
                    navigate('/success')
                }
            })
            .catch(error=>{
                if(error.response.status === 400){
                    setResponseErr('Invalid OTP')
                }
            })
        }
    }
    return ( 
        <div className="card">
            <div className="background confirm-bg"></div>
            <div className="formBlock">
                <div className="div">
                    <div className="confirmEmailForm">
                        <h2>Enter OTP</h2>
                        <div className='myForm confirm'>
                            <p>We've sent a OTP to <span className="dynamicEmail"> {ctx.formData.email}</span>.</p>
                            <div className="confirmElement">
                                <OTPInput
                                    className='otpInput'
                                    inputStyles={{width:'100%', height:'50px', border: '1.5px solid gray', borderRadius: '0.7rem',marginRight:'unset'}}
                                    value={myOtp}
                                    onChange={setMyOtp}
                                    autofocus
                                    OTPLength={6}
                                    otpType='number'
                                    disabled={false}
                                    secure
                                />
                                {<small className='otpErr'>{responseErr!== "" && responseErr}{errors.otp}</small>}
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
 
export default ConfirmEmail;