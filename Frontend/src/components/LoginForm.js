import React,{useState} from 'react';
import { useNavigate } from 'react-router-dom';
import './LoginForm.css';
import axios from 'axios';

const LoginForm = ({ setFormData, setDatabases }) => {
    const navigate = useNavigate();
    const [formData, updateFormData] = useState({
        host: '',
        username: '',
        password: ''
    });
    const [responseMessage, setResponseMessage] = useState('');

    const handleChange = (e) => {
        updateFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:3001/connect', formData);
            if (response.status===200) {
                navigate('/dashboard', { state: { formData } });
            } else {
                setResponseMessage('Failed to connect to the database.');
            }
        } catch (error) {
            setResponseMessage('Failed to connect to the database.');
            console.error('Error:', error);
        }
    };    
    
    return (
        <section id="LoginForm" className="login-container">
            <h2 className="login-title">Get Started</h2>
            <p className="login-description">
                Have queries? Enter your credentials for database connection and start querying!
            </p>
            <form className="login-form" onSubmit={handleSubmit}>
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