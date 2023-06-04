import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Error.css';

function Error404() {
    const navigate = useNavigate();
    const [isVisible, setIsVisible] = useState(true);

    useEffect(() => {
        if (!isVisible) {
            navigate('/news');
        }
    }, [isVisible, navigate]);

    const handleClose = () => {
        setIsVisible(false);
    };

    return (
        isVisible ? (
            <div className="error">
                <img src="https://ru.hostings.info/upload/images/2021/12/e11044b915dc39afc3004430606bd6d1.jpg" alt="Page not Found" style={{width: '100%', margin: 'auto'}}></img>
                <button className="close-btn" onClick={handleClose}>
                    &times;
                </button>
            </div>
        ) : null
    );
}

export default Error404;
