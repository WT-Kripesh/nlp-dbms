import React from 'react';
import './Footer.css';

const Footer = () => {
    return (
        <footer className="footer-container">
            <div className="footer-content">
                <div className="footer-logo">
                    <p>NLP-based-DBMS {new Date().getFullYear()}  &copy; DoECE</p>
                </div>

                <div className="footer-social">
                    <a href="#" target="_blank" rel="noopener noreferrer">
                        <i className="fab fa-facebook-f"></i>
                    </a>
                    <a href="#" target="_blank" rel="noopener noreferrer">
                        <i className="fab fa-twitter"></i>
                    </a>
                    <a href="#" target="_blank" rel="noopener noreferrer">
                        <i className="fab fa-linkedin-in"></i>
                    </a>
                    <a href="#" target="_blank" rel="noopener noreferrer">
                        <i className="fab fa-github"></i>
                    </a>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
