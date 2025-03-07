import React,{useState} from 'react';
import { useNavigate } from 'react-router-dom';
import './styles/LoginForm.css';
import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || "http://localhost:3001";

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
            const response = await axios.post(`${API_BASE_URL}/connect`, formData);
            if (response.status===200) {
                navigate('/dashboard', { state: { formData } });
            } else {
                setResponseMessage('Invalid credentials');
            }
        } catch (error) {
            setResponseMessage('Connection error');
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
