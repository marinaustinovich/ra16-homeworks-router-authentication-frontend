import React, { useContext, useEffect, useState } from 'react'
import CardBody from '../CardBody/CardBody';
import CardImage from '../CardImage/CardImage';
import PropTypes from 'prop-types';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../../contexts/AuthContext';
import Error from '../Error/Error';

function Card(props) {
    const {token } =   useContext(AuthContext);
    const [card, setCard] = useState(null);
    const [error, setError] = useState(null);
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        if (!props.onClick) {
            let ignore = false;
            fetch(`${process.env.REACT_APP_NEWS_URL}/${id}`, {
                            headers: {
                                Authorization: `Bearer ${token}`,
                            },
                        })
                        .then(response => {
                            if (!response.ok) {
                                if (response.status === 404) {
                                    navigate('/error404');
                                }

                                if (response.status === 401) {
                                    navigate('/');
                                    localStorage.removeItem('profile');
                                }
                                throw new Error("An error occurred");
                            }
                            return response.json();
                        })
            .then(json => {
                if (!ignore) {
                    setCard(json);
                } 
            })
            .catch(error => {
                if (!ignore) {
                    setError(error.message);
                }
            })

            return () => {
                ignore = true;
            };
        } else {
            setCard(props)
        }
    }, [token, id]);
    
    if (!card) {
        return <p>Loading card...</p>;
    }

    return (
        <div className="w-30 d-flex align-items-end" onClick={card.onClick}>
            <div className="card">
                {card.image && (
                    <CardImage {...card} />
                )}
                <CardBody {...card}></CardBody>
            </div>
            {error && <Error>{error}</Error>}
        </div>
    )
}

Card.propTypes = {
    image: PropTypes.string,  
}

export default Card
