import './LogOut.css'
import {MdWavingHand} from 'react-icons/md'
import { Link } from 'react-router-dom';
import React from 'react'
const LogOut = () => {
    return ( 
        <React.Fragment>
            <div className="mySuccessBlock">
                <div className="myBg">
                    <div className='logOutSuccess'>
                        <MdWavingHand size={70} color={'black'}/>
                        <h1>See you soon...</h1>
                        <span>Click <Link to={'/login'}>here</Link> to Log In.</span>
                    </div>
                </div>
                
            </div>
        </React.Fragment>
        
    );
}
 
export default LogOut;