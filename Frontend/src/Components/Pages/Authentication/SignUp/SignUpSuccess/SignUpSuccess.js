import './SignUpSuccess.css'
import {BsCheckCircle} from 'react-icons/bs'
import { Link } from 'react-router-dom';
import React from 'react'
const SignUpSuccess = () => {
    return ( 
        <React.Fragment>
            <div className="mySuccessBlock">
                <div className="myBg">
                    <div className='signUpSuccess'>
                        <BsCheckCircle size={70} color={'black'}/>
                        <h1>Successful!</h1>
                        <span>Click <Link to={'/login'}>here</Link> to Log In.</span>
                    </div>
                </div>
                
            </div>
        </React.Fragment>
        
    );
}
 
export default SignUpSuccess;