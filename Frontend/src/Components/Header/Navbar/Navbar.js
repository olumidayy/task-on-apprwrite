import { Link } from 'react-router-dom';
import './Navbar.css'
import {RxHamburgerMenu} from 'react-icons/rx'
import {TfiClose} from 'react-icons/tfi'
import {BsPersonFillCheck} from 'react-icons/bs'
import { useRef, useState, useContext } from 'react';
import ProfileContext from '../../../Contexts/ProfileContextProvider/ProfileContext';
const Navbar = () => {
    const myId = localStorage.getItem('myId')
    const ctx = useContext(ProfileContext)
    const navRef = useRef()
    const [navDisplay, setNavDisplay] = useState(false)
    const handleNavDisplay = () => {
        setNavDisplay(!navDisplay)
        navRef.current.classList.toggle('responsive_nav')
    }
    const clear = () => {
        localStorage.clear()
    }
    return ( 
        <nav className='navbar'>
            <div className="logo">
                <h1>Task<span>On</span>!</h1>
            </div>
            <div className="nav" ref={navRef}>
                <div className="navBlock">
                    <ul>
                        <li><Link to={'/dashboard'}>Dashboard</Link></li>
                        <li><button className='animated bounce'><Link to={'/create'}>New Task +</Link></button></li>
                        <li><Link onClick={clear} to={'/logout'}>Logout</Link></li>
                        <li>
                            <div className='profile'>
                                <Link to={`/profile`}>{<BsPersonFillCheck size={30}/>}</Link>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
            {!navDisplay ? <RxHamburgerMenu className='mobile'size={30} color={'black'} onClick={handleNavDisplay}/> : <TfiClose className='mobile-close'size={30} color={'white'} onClick={handleNavDisplay}/>}
        </nav>
    );
}
 
export default Navbar;
<nav></nav>