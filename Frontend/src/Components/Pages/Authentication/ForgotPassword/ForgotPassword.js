import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import ForgotPasswordContext from '../../../../Contexts/AuthContextProvider/ForgotPasswordContext/ForgotPasswordContext';
import './ForgotPassword.css'
import React from 'react'
const ForgotPassword = () => {
    const ctx =  useContext(ForgotPasswordContext)
    const navigate = useNavigate()
    const handleSubmit = () => {
        ctx.handleSubmit().then(res=>{
            if(res.forgotSuccess){
                navigate('/confirmReset')
            }
            else if(res.forgotSuccess === null){
                navigate('/forgot')
            }
        })
    }
    return (
        <React.Fragment>
            <div className="card">
                <div className="background reset-bg"></div>
                <div className="formBlock">
                    <div className="div">
                        <div className="resetPasswordForm">
                            <h2>Reset Password</h2>
                            <form className="myForm forgot">
                                <div className="formElement">
                                    <label htmlFor="email">
                                        Email
                                        <small>{ctx.forgotPasswordErrors.email}</small>
                                    </label>
                                    <input type="email" name='email' value={ctx.formData.email} onChange={ctx.handleChange} placeholder='example@example.com' />
                                </div>
                                <div className="formActions">
                                    <button type='button' className='animated bounce' onClick={handleSubmit}>Submit</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment>
        
    );
}
export default ForgotPassword;