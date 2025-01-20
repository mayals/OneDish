import React, { useState, useEffect } from "react";
import { AccountContext } from "./AccountContext";



export const AccountProvider = ({ children }) => {
    // states
    const [user, setUser] = useState(null);
    const [accessToken, setAccessToken] = useState(null);
    const [refreshToken, setRefreshToken] = useState(null);




    // Check localStorage for existing tokens on initial load
    useEffect(() => {
        const storedAccessToken = localStorage.getItem('accessToken');
        const storedRefreshToken = localStorage.getItem('refreshToken');
        const storedUser = localStorage.getItem('user');

        // set values inside provider states
        if (storedAccessToken && storedRefreshToken && storedUser) {
            setAccessToken(storedAccessToken);
            setRefreshToken(storedRefreshToken);
            setUser(JSON.parse(storedUser));
        }
    }, []);




    // Function to update user data after login
    const loginUser = (userData, accessToken, refreshToken) => {
        setUser(userData);
        setAccessToken(accessToken);
        setRefreshToken(refreshToken);

        // Store tokens and user data in localStorage
        localStorage.setItem('accessToken', accessToken);
        localStorage.setItem('refreshToken', refreshToken);
        localStorage.setItem('user', JSON.stringify(userData));
    };




    // Function to logout user
    const logoutUser = () => {
        setUser(null);
        setAccessToken(null);
        setRefreshToken(null);

        // Remove tokens and user data from localStorage
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        localStorage.removeItem('user');
    };

    return (
        <AccountContext.Provider value={{ user, accessToken, refreshToken, loginUser, logoutUser }}>
            {children}
        </AccountContext.Provider>
    );
};