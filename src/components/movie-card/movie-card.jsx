import React from 'react';
import PropTypes from 'prop-types';
import genres from "../../mocks/genres";

const MovieCard = ({item, onEnter, onClick}) => {
  const {
    title,
    picture
  } = item;

  return <article className="small-movie-card catalog__movies-card" onMouseEnter={() => onEnter(item)}>
    <button className="small-movie-card__play-btn" type="button" onClick={() => onClick(item)}>Play</button>
    <div className="small-movie-card__image">
      <img src={`img/` + picture.toLowerCase()}
        alt={title} width="280" height="175"/>
    </div>
    <h3 className="small-movie-card__title">
      <a className="small-movie-card__link" href="movie-page.html" onClick={() => onClick(item)}>{title}</a>
    </h3>
  </article>;
};

MovieCard.propTypes = {
  item: PropTypes.shape({
    genre: PropTypes.arrayOf(PropTypes.oneOf(genres)),
    title: PropTypes.string.isRequired,
    desc: PropTypes.string,
    picture: PropTypes.string.isRequired,
    year: PropTypes.number
  }).isRequired,
  onEnter: PropTypes.func,
  onClick: PropTypes.func
};

export default MovieCard;
