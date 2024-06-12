import React, { useState, useEffect } from 'react';
import { AuthContext } from './AuthContext';
import axios from 'axios';
import { toast } from 'react-toastify';

export const AuthProvider = ({ children, logoutCallback }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [accountName, setAccountName] = useState('');

    const loginSuccess = (email, name) => { 
        setAccountName(name);
        setIsLoggedIn(true);
    };

    useEffect(() => {
        const token = localStorage.getItem('jwt');
        const storedUsername = localStorage.getItem('email');
        if (token && storedUsername) {
            setIsLoggedIn(true);
        }
    }, []);

    const onLogout = () => {
        localStorage.removeItem("jwt");
        localStorage.removeItem("email");
        setIsLoggedIn(false);
        setAccountName('');
        toast.success("Đăng xuất thành công!");
        if (logoutCallback) {
            logoutCallback();
        }
    };

    return (
        <AuthContext.Provider value={{ isLoggedIn, accountName, onLogout }}>
            {children}
        </AuthContext.Provider>
    );
};
