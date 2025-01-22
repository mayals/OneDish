import React, { useState, useEffect} from 'react';
import { TokenContext } from './TokenContext';


export const TokenProvider = ({ children }) => {
    
    const [accessToken, setAccessToken] = useState(null);
    const [refreshToken, setRefreshToken] = useState(null);

    useEffect(() => {
        const storedAccessToken = localStorage.getItem('accessToken');
        const storedRefreshToken = localStorage.getItem('refreshToken');

        if (storedAccessToken && storedRefreshToken) {
            setAccessToken(storedAccessToken);
            setRefreshToken(storedRefreshToken);
        }
    }, []);

    
    return (
        <TokenContext.Provider value={{ accessToken, refreshToken, setAccessToken, setRefreshToken }}>
            {children}
        </TokenContext.Provider>
    );
};