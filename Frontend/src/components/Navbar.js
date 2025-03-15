import React,{useState} from 'react';
import {Link} from 'react-router-dom'
import './styles/Navbar.css'
import logo from './assets/icon.png';
const Navbar = () => {
    const [menuOpen, setMenuOpen] = useState(false);
    const handleLinkClick = () => {
        setMenuOpen(false);
    };

    return (
        <nav className="navbar">
            <div className='nav-left'>
            <img src={logo} alt="Project Logo" className="nav-logo" />
            <a className='nav-title' href='/'>NLP based DBMS</a>
            </div>
            <ul className={`nav-links ${menuOpen ? "active" : ""}`}>
                <li><Link to="/" onClick={handleLinkClick}>Home</Link></li>
                <li><Link to="/how-it-works" onClick={handleLinkClick}>Working</Link></li>
                <li><Link to="/features" onClick={handleLinkClick}>Features</Link></li>
                <li><Link to="/team" onClick={handleLinkClick}>Team</Link></li>
                <li><Link to="/get-started" onClick={handleLinkClick}>Get Started</Link></li>
            </ul>

            <div className="hamburger" onClick={() => setMenuOpen(!menuOpen)}>
                ☰
            </div>

        </nav>
    );
};

export default Navbar;
