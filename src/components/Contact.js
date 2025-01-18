import React from 'react';
import './Contact.css';

const Contact = () => {
    return (
        <section id="contact" className="contact-container">
            <h2 className="contact-title">Get Started</h2>
            <p className="contact-description">
                Have queries? Enter your credintials for databse connection and start querying!
            </p>
            <form className="contact-form">
                <div className="form-group">
                    <label htmlFor="name" className="form-label">Host</label>
                    <input type="text" id="name" name="name" className="form-input" required />
                </div>
                <div className="form-group">
                    <label htmlFor="email" className="form-label">Username</label>
                    <input type="email" id="email" name="email" className="form-input" required />
                </div>
                <div className="form-group">
                    <label htmlFor="message" className="form-label">Password</label>
                    <input type="password" id="pass" name="password" className="form-input" required />
                </div>
                <button type="submit" className="form-button">Connect</button>
            </form>
        </section>
    );
};

export default Contact;
