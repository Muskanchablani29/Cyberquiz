// src/context/AuthContext.js
import React, { createContext, useContext, useReducer } from 'react';
import { authReducer } from './AuthReducer';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const initialState = {
        user: localStorage.getItem('user') || null,
        loading: false,
        error: null
    };

    const [state, dispatch] = useReducer(authReducer, initialState);

    const signup = async (userData) => {
        try {
            dispatch({ type: 'AUTH_START' });
            // Your signup API call here
            const response = await fetch('/api/signup', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(userData)
            });
            const data = await response.json();
            
            if (!response.ok) throw new Error(data.message);
            
            dispatch({ type: 'SIGNUP_SUCCESS' });
            return data;
        } catch (error) {
            dispatch({ type: 'AUTH_ERROR', payload: error.message });
            throw error;
        }
    };

    const login = async (credentials) => {
        try {
            dispatch({ type: 'AUTH_START' });
            // Your login API call here
            const response = await fetch('/api/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(credentials)
            });
            const data = await response.json();
            
            if (!response.ok) throw new Error(data.message);
            
            localStorage.setItem('user', data.user);
            localStorage.setItem('token', data.token); // If you're using JWT
            dispatch({ type: 'AUTH_SUCCESS', payload: data.user });
        } catch (error) {
            dispatch({ type: 'AUTH_ERROR', payload: error.message });
            throw error;
        }
    };

    const logout = () => {
        localStorage.removeItem('user');
        localStorage.removeItem('token');
        dispatch({ type: 'LOGOUT' });
    };

    const deleteAccount = async () => {
        try {
            dispatch({ type: 'DELETE_ACCOUNT_START' });
            
            const response = await fetch('/api/delete-account', {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            });

            if (!response.ok) {
                const data = await response.json();
                throw new Error(data.message);
            }

            localStorage.removeItem('user');
            localStorage.removeItem('token');
            dispatch({ type: 'DELETE_ACCOUNT_SUCCESS' });
        } catch (error) {
            dispatch({ type: 'DELETE_ACCOUNT_ERROR', payload: error.message });
            throw error;
        }
    };

    return (
        <AuthContext.Provider value={{
            user: state.user,
            loading: state.loading,
            error: state.error,
            login,
            logout,
            signup,
            deleteAccount
        }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
