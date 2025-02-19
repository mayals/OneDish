import React, { useState,useEffect } from "react";
import { useNavigate } from "react-router-dom";
// context 
import { UserContext } from "./UserContext";
import {AxiosInstance} from '../../api/AxiosInstance.js';


export const UserProvider = ({ children }) => {
    const [user, setUser] = useState({});
    const [role, setRole] = useState("");



    const fetchUserData = async () => {
        const accessToken = localStorage.getItem('accessToken');
        if (accessToken) {
            try {
                const response = await AxiosInstance.get('/account/request-user/');
                console.log('UserProvider response.data=', response.data);
                setUser(response.data);
                setRole(response.data.role);
            } catch (error) {
                console.error('Failed to fetch user data:', error);
            }
        }
    };



    useEffect(() => {
        fetchUserData();
    }, []);


    
    return (
        <UserContext.Provider value={{ user, role, setUser, setRole, fetchUserData }}>
            {children}
        </UserContext.Provider>
    );
};
