import React from 'react';
import {Link} from 'react-router-dom'
import './Navbar.css'
import logo from './assets/icon.png';
const Navbar = () => {
    return (
        <nav className="navbar">
            <div className='nav-left'>
            <img src={logo} alt="Project Logo" className="nav-logo" />
            <a className='nav-title' href='#home'>NLP based DBMS</a>
            </div>
            {/* <ul className="nav-links">
                <li><a href="#home">Home</a></li>
                <li><a href="#how-it-works">Working</a></li>
                <li><a href="#features">Features</a></li>
                <li><a href="#team">Team</a></li>
                <li><a href="#LoginForm">Login</a></li>
            </ul> */}
            <ul className="nav-links">
                <li><Link to="/">Home</Link></li>
                <li><Link to="/how-it-works">Working</Link></li>
                <li><Link to="/features">Features</Link></li>
                <li><Link to="/team">Team</Link></li>
                <li><Link to="/get-started">Get Started</Link></li>
            </ul>
        </nav>
    );
};

export default Navbar;
