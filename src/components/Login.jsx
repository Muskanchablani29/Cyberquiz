import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from '../context/AuthContext';
import "./Login.css";
import { 
    FaUser, 
    FaLock, 
    FaEnvelope, 
    FaGoogle, 
    FaGithub, 
    FaLinkedin,
    FaDiscord 
} from 'react-icons/fa';
import quizLogo from '../Images/Quiz.jpg';
import studyImage from '../Images/Quiz.jpg';
import learnImage from '../Images/Quiz.jpg';

const Login = () => {
    const [isSignUpMode, setIsSignUpMode] = useState(false);
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: ''
    });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();
    const { login, signup, user } = useAuth();

    useEffect(() => {
        if (user) {
            navigate('/');
        }
    }, [user, navigate]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
        setError('');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            if (isSignUpMode) {
                if (!formData.email || !formData.username || !formData.password) {
                    throw new Error('Please fill in all fields');
                }
                if (formData.password.length < 6) {
                    throw new Error('Password must be at least 6 characters');
                }
                if (/\s/.test(formData.username)) {
                    throw new Error('Username cannot contain spaces');
                }
                await signup(formData);
                setIsSignUpMode(false);
                setFormData({ username: '', email: '', password: '' });
                alert('Signup successful! Please log in.');
            } else {
                if (!formData.username || !formData.password) {
                    throw new Error('Please fill in all fields');
                }
                await login({ username: formData.username, password: formData.password });
                navigate('/');
            }
        } catch (err) {
            setError(err.message || 'An error occurred');
        } finally {
            setLoading(false);
        }
    };

    const switchMode = () => {
        setIsSignUpMode(prev => !prev);
        setFormData({ username: '', email: '', password: '' });
        setError('');
    };

    const handleSocialLogin = (platform) => {
        console.log(`${platform} login clicked`);
    };

    return (
        <div className="login-wrapper">
            <div className={`container ${isSignUpMode ? 'sign-up-mode' : ''}`}>
                <div className="forms-container">
                    <div className="signin-signup">
                        <form className="form" onSubmit={handleSubmit}>
                            <div className="form-content">
                                <img src={quizLogo} alt="Quiz Logo" className="form-logo" />
                                <h2 className="title">
                                    {isSignUpMode ? 'Create Account' : 'Welcome Back'}
                                </h2>

                                <div className="input-field">
                                    <FaUser className="input-icon" />
                                    <input
                                        type="text"
                                        name="username"
                                        placeholder="Username"
                                        value={formData.username}
                                        onChange={handleChange}
                                        disabled={loading}
                                    />
                                </div>

                                {isSignUpMode && (
                                    <div className="input-field">
                                        <FaEnvelope className="input-icon" />
                                        <input
                                            type="email"
                                            name="email"
                                            placeholder="Email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            disabled={loading}
                                        />
                                    </div>
                                )}

                                <div className="input-field">
                                    <FaLock className="input-icon" />
                                    <input
                                        type="password"
                                        name="password"
                                        placeholder="Password"
                                        value={formData.password}
                                        onChange={handleChange}
                                        disabled={loading}
                                    />
                                </div>

                                {error && <div className="error-message">{error}</div>}

                                <button 
                                    type="submit" 
                                    className="btn solid"
                                    disabled={loading}
                                >
                                    {loading ? (
                                        <div className="loading-spinner" />
                                    ) : (
                                        isSignUpMode ? 'Sign up' : 'Login'
                                    )}
                                </button>

                                <div className="social-container">
                                    <p className="social-text">Or continue with</p>
                                    <div className="social-media">
                                        <button 
                                            type="button" 
                                            className="social-icon"
                                            onClick={() => handleSocialLogin('Google')}
                                            disabled={loading}
                                        >
                                            <FaGoogle />
                                        </button>
                                        <button 
                                            type="button" 
                                            className="social-icon"
                                            onClick={() => handleSocialLogin('Github')}
                                            disabled={loading}
                                        >
                                            <FaGithub />
                                        </button>
                                        <button 
                                            type="button" 
                                            className="social-icon"
                                            onClick={() => handleSocialLogin('LinkedIn')}
                                            disabled={loading}
                                        >
                                            <FaLinkedin />
                                        </button>
                                        <button 
                                            type="button" 
                                            className="social-icon"
                                            onClick={() => handleSocialLogin('Discord')}
                                            disabled={loading}
                                        >
                                            <FaDiscord />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>

                <div className="panels-container">
                    <div className="panel left-panel">
                        <div className="content">
                            <h3>New to QuizMaster?</h3>
                            <p>
                                Join our community of learners and test your knowledge with 
                                exciting quizzes across various topics!
                            </p>
                            <button 
                                className="btn transparent" 
                                onClick={switchMode}
                                disabled={loading}
                            >
                                Sign up
                            </button>
                        </div>
                        <div className="image-wrapper">
                            <img src={studyImage} className="image" alt="study illustration" />
                        </div>
                    </div>

                    <div className="panel right-panel">
                        <div className="content">
                            <h3>Already a QuizMaster?</h3>
                            <p>
                                Login to continue your learning journey and challenge 
                                yourself with new quizzes!
                            </p>
                            <button 
                                className="btn transparent" 
                                onClick={switchMode}
                                disabled={loading}
                            >
                                Sign in
                            </button>
                        </div>
                        <div className="image-wrapper">
                            <img src={learnImage} className="image" alt="learn illustration" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
