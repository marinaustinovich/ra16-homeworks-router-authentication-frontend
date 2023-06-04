import { useState } from "react";
import AuthContext from "../../contexts/AuthContext";
import useStorage from "../../hooks/useStorage";
import {  useNavigate } from 'react-router-dom';

export default function AuthProvider(props) {
    const [token, setToken, clearStorage] = useStorage(localStorage, 'token');
    const [profile, setProfile] = useStorage(localStorage, 'profile', true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleLogin = async (login, password) => {
        try {
            const response = await fetch(process.env.REACT_APP_AUTH_URL, {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({login, password}),
            });

            if (!response.ok) {
                if (response.status === 401 || response.status === 500) {
                    const errorMessage = await response.json();
                    setError(errorMessage); 
                }
                throw new Error('Auth failed');
            }
            const {token} = await response.json();
            setToken(token);
            setError(null);
            } catch (e) {
                console.error(e)
            }
    }
    const handleLogout = () => {
        setToken(null);
        setProfile(null);
        setError(null);
        clearStorage();
        navigate('/')
    }

    return (
        <AuthContext.Provider value={{handleLogin, handleLogout, token, profile, error }}>
            {props.children}
        </AuthContext.Provider>
    )
}