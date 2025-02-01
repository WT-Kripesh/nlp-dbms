import React,{useState} from 'react';
import { useNavigate } from 'react-router-dom';
import './LoginForm.css';
import axios from 'axios';

const LoginForm = () => {
    const navigate = useNavigate()
    const [formData, setFormData] = useState({
        host: '',
        username: '',
        password: ''
    });

    const [responseMessage, setResponseMessage] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:3001/connect', formData);
            setResponseMessage(response.data.message);
            console.log(response.data.databases);
            navigate('/dashboard'); 
        } catch (error) {
            setResponseMessage('Failed to connect to the database. Please check your credentials.');
            console.error('Error connecting to the database:', error);
        }
    };

    return (
        <section id="LoginForm" className="contact-container">
            <h2 className="contact-title">Get Started</h2>
            <p className="contact-description">
                Have queries? Enter your credentials for database connection and start querying!
            </p>
            <form className="contact-form" onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="host" className="form-label">Host</label>
                    <input
                        type="text"
                        id="host"
                        name="host"
                        className="form-input"
                        value={formData.host}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="username" className="form-label">Username</label>
                    <input
                        type="text"
                        id="username"
                        name="username"
                        className="form-input"
                        value={formData.username}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        className="form-input"
                        value={formData.password}
                        onChange={handleChange}
                        required
                    />
                </div>
                <button type="submit" className="form-button">Connect</button>
            </form>
            {responseMessage && (
                <p className="response-message">{responseMessage}</p>
            )}
        </section>
    );
};

export default LoginForm;