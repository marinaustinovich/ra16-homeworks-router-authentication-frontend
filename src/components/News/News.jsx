import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import Card from '../Card/Card';
import AuthContext from '../../contexts/AuthContext';

function News(props) {
    const {token } =   useContext(AuthContext);
    const [news, setNews] = useState([]);
    const [error, setError] = useState(null);
    const [selectedCard, setSelectedCard] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        let ignore = false;
            fetch(process.env.REACT_APP_NEWS_URL, {
                            headers: {
                                Authorization: `Bearer ${token}`,
                            },
                        })
            .then(response => response.json())
            .then(json => {
                
                if (!ignore) {
                    setNews(json);
                } 
            })
            .catch(error => {
                console.log(error);
                
                if (!ignore) {
                    setError(error.message);
                    navigate('/');
                    localStorage.removeItem('profile');
                }
            })

        return () => {
            ignore = true;
        };
    }, [token]);

    if (!news) {
        return <p>Loading news...</p>;
    }

    if(error) {
        return <p>Error...</p>;
    }

    const handleCardClick = (card) => {
        setSelectedCard(card);
        navigate(`/news/${card.id}`);
    };

    return (
        <div className="card-group" id={props.id}>
            {selectedCard ? (
                    <Card {...selectedCard} />
                ) : (
                    news.map((item) => (
                        <Card key={item.id} {...item} onClick={() => handleCardClick(item)} />
                    ))
                )}
        </div>

    )
}

News.propTypes = {
    id: PropTypes.string
}

export default News
