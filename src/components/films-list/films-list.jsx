import React from 'react';
import PropTypes from 'prop-types';

import MovieCard from '../movie-card/movie-card.jsx';
import genres from '../../mocks/genres.js';

const FilmsList = ({films, onClick}) => {
  const itemList = films.map((item, index) => {
    return (
      <MovieCard
        item={item}
        key={index}
        onClick={onClick}
      />
    );
  });

  return <div className="catalog__movies-list">
    {itemList}
  </div>;
};

FilmsList.propTypes = {
  films: PropTypes.arrayOf(PropTypes.shape({
    genre: PropTypes.arrayOf(PropTypes.oneOf(genres)),
    title: PropTypes.string.isRequired,
    desc: PropTypes.string,
    poster: PropTypes.string.isRequired,
    year: PropTypes.number
  })).isRequired,
  onClick: PropTypes.func
};

export default FilmsList;
