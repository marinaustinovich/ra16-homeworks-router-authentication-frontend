import React from 'react'
import PropTypes from 'prop-types'

function CardImage(props) {
    const { image } = props;
    
    return (
        <img src={image} className="card-img-top" alt={image} />
    )
}

CardImage.propTypes = {
    image: PropTypes.string.isRequired,
}

export default CardImage
