import React, { useContext, useEffect, useState } from 'react';
import './Logout.css';
import AuthContext from '../../contexts/AuthContext';
import useStorage from '../../hooks/useStorage';
import {  useNavigate } from 'react-router-dom';

function Logout() {
    const {token, handleLogout} =   useContext(AuthContext);
    const [profile, setProfile, clearStorage] = useStorage(localStorage, 'profile', true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
            let ignore = false;
            fetch(process.env.REACT_APP_PRIVSTE_ME_URL, {
                            headers: {
                                Authorization: `Bearer ${token}`,
                            },
                        })
            .then(response => response.json())
            .then(json => {
                
                    if (!ignore) {
                        setProfile(json);
                        navigate('/news');
                    } 
            })
            .catch(error => {
                if (!ignore) {
                    console.log('logout error')
                    setError(error.message);
                    navigate('/');
                    clearStorage();
                }
            })

        return () => {
            ignore = true;
        };
    }, [token]);

    if (!profile) {
        console.error('Failed to fetch profile');
        return <p>Loading profile...</p>;
    }

    if(error) {
        return <p>Error...</p>;
    }


    return (
        <div className='form-wrapper'>
            <p>Neto Social</p>
            <div className="user-wrapper">
                <p className='user-text'>Hello, {profile.name}</p>
                <img className="user-avatar" src={profile.avatar}alt={profile.name} />
            </div>

            <button onClick={handleLogout} className='logout'>Logout</button>
        </div>
    );
}

export default Logout
