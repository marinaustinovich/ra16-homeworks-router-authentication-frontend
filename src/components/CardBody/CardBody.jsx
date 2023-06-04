import React from 'react'
import PropTypes from 'prop-types';
import './CardBody.css';

function CardBody(props) {
    const { title, content } = props;
    return (
        <div className="card-body">
            <h5 className="card-title">{title}</h5>
            <p className="card-text">{content}</p>
        </div>
    )
}

CardBody.propTypes = {
    title: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
}

export default CardBody
