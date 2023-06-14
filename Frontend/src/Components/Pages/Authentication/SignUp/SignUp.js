import { useState } from 'react';
import { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {AiOutlineEye, AiOutlineEyeInvisible} from 'react-icons/ai'
import React from 'react'
import SignUpContext from '../../../../Contexts/AuthContextProvider/SignUpContext/SignUpContext';
import './SignUp.css'
const SignUp = () => {
  const navigate = useNavigate()
  const ctx = useContext(SignUpContext)
  const [responseErr, setResponseErr] = useState('')
  const handleConfirmation = () => {
    ctx.handleSubmit().then(res=>{
      if(res.signUpSuccess){
        navigate('/confirmEmail')
      }
      else if(res.signUpSuccess === null){
        alert('SOMETHING WENT WRONG!')
        navigate('/signup')
        return
      }
      else{
        setResponseErr('Email is already in use')
      }
    }) 
  }
    return (
        <React.Fragment>
          <div className='card'>
            <div className="background signup-bg"></div>
            <div className="formBlock">
              <div className="div">
                {<div className='signUpForm'>
                  <h2>Sign Up</h2>
                  <form className='myForm signup'>
                    <div className="formElement">
                      <label htmlFor="username">
                        Firstname
                        <small>{ctx.formErrors.firstname}</small>
                      </label>
                      <input className={ctx.formErrors.firstname ?'error' : ''} type="text" name='firstname' placeholder='Enter your firstname' autoComplete='on' onChange={ctx.handleChange} value={ctx.formData.firstname} />
                    </div>
                    <div className="formElement">
                      <label htmlFor="lastname">
                        Lastname
                        <small>{ctx.formErrors.lastname}</small>
                      </label>
                      <input className={ctx.formErrors.lastname ?'error' : ''} type="text" name='lastname' autoComplete='on' placeholder='Enter your last name' onChange={ctx.handleChange} value={ctx.formData.lastname} />
                    </div>
                    <div className="formElement">
                      <label htmlFor="email">
                        Email
                        <small>{responseErr !== "" && responseErr}{ctx.formErrors.email}</small>
                      </label>
                      <input className={ctx.formErrors.password || responseErr !== "" ?'error' : ''} type="email" name='email' autoComplete='on' placeholder='example@example.com' onChange={ctx.handleChange} value={ctx.formData.email}/>
                    </div>
                    <div className="formElement">
                      <label htmlFor="password">
                        Password
                        <small>{ctx.formErrors.password}</small>
                      </label>
                      <div className="passwordBlock">
                        <input className={ctx.formErrors.password ?'error' : ''} type={ctx.visible?"text" : "password"} name='password' autoComplete='on' onChange={ctx.handleChange} value={ctx.formData.password}/>
                        {ctx.visible ? <AiOutlineEyeInvisible className='visibility' onClick={ctx.handleVisibility} size={25}/> : <AiOutlineEye  onClick={ctx.handleVisibility} size={25} className='visibility'/>}
                      </div>
                    </div>
                    <div className="formActions">
                      <button onClick={handleConfirmation} type='button' className='animated bounce'>Create Account</button>
                    </div>
                  </form>
                  <p className='signInText'>Already have an account? <span><Link to={'/login'}>Login</Link></span></p>
                </div>}
              </div>
            </div>
          </div>
        </React.Fragment>
        
      );
}

export default SignUp;