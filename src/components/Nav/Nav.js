import React from 'react';
import {Link} from 'react-router-dom';
import './Nav.css';

export default function Nav(){
    return(
        <div className='main-nav'>
            <Link to="/"><h1>LOGO</h1></Link>
            <Link to="/dashboard">Login/Signup</Link>
            <div>
                <p>Menu</p>
                <ul>
                    <li><Link to="/contact">Contact</Link></li>
                    <li><Link to="/about">About</Link></li>
                    <li><Link to="/resources">Resources</Link></li>
                </ul>
            </div>
        </div>
    )
}