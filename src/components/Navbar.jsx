import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Navbar.css';
import { FaUserCircle, FaSignOutAlt, FaTrashAlt, FaTimes } from 'react-icons/fa';

const DeleteAccountModal = ({ isOpen, onClose, onConfirm }) => {
    if (!isOpen) return null;

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <h2>Delete Account</h2>
                <p>Are you sure you want to delete your account? This action cannot be undone.</p>
                <div className="modal-buttons">
                    <button className="modal-button cancel" onClick={onClose}>
                        Cancel
                    </button>
                    <button className="modal-button delete" onClick={onConfirm}>
                        Delete Account
                    </button>
                </div>
            </div>
        </div>
    );
};

const Navbar = () => {
    const { user, logout, deleteAccount, loading, error: authError } = useAuth();
    const [showDropdown, setShowDropdown] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    // Handle auth errors
    React.useEffect(() => {
        if (authError) {
            setError(authError);
        }
    }, [authError]);

    const handleLogout = () => {
        logout();
        setShowDropdown(false);
        navigate('/login');
    };

    const handleDeleteAccount = () => {
        setShowDeleteModal(true);
        setShowDropdown(false);
    };

    const confirmDeleteAccount = async () => {
        try {
            await deleteAccount();
            setShowDeleteModal(false);
            navigate('/login');
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <>
            <nav className="navbar">
                <div className="navbar-container">
                    <Link to="/" className="navbar-title-link">
                        <h1 className="navbar-title">Cybersecurity Quiz</h1>
                    </Link>

                    <div className="navbar-user-section">
                        <div className="profile-container">
                            <FaUserCircle className="profile-icon" />
                            {user ? (
                                <div className="user-dropdown">
                                    <span 
                                        className="username-text"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            setShowDropdown(!showDropdown);
                                        }}
                                    >
                                        {user}
                                    </span>
                                    {showDropdown && (
                                        <div className="dropdown-menu">
                                            <button 
                                                className="dropdown-item"
                                                onClick={handleLogout}
                                            >
                                                <FaSignOutAlt className="dropdown-icon" />
                                                Logout
                                            </button>
                                            <button 
                                                className="dropdown-item delete-account"
                                                onClick={handleDeleteAccount}
                                            >
                                                <FaTrashAlt className="dropdown-icon" />
                                                Delete Account
                                            </button>
                                        </div>
                                    )}
                                </div>
                            ) : (
                                <Link to="/login" className="login-link">
                                    <span className="profile-text">Profile</span>
                                </Link>
                            )}
                        </div>
                    </div>
                </div>
            </nav>

            <DeleteAccountModal 
                isOpen={showDeleteModal}
                onClose={() => setShowDeleteModal(false)}
                onConfirm={confirmDeleteAccount}
            />

            {error && (
                <div className="error-message">
                    {error}
                    <button 
                        className="error-close-button"
                        onClick={() => setError(null)}
                    >
                        <FaTimes />
                    </button>
                </div>
            )}

            {loading && (
                <div className="loading-spinner">
                    <div className="spinner"></div>
                    <span>Loading...</span>
                </div>
            )}
        </>
    );
};

export default Navbar;
