import React from 'react';
import PropTypes from 'prop-types';
import withActiveItem from "../hocs/withActiveItem/withActiveItem.jsx";
import MovieCard from '../movie-card/movie-card.jsx';
import genres from '../../mocks/genres.js';

const FilmsList = ({films, onGenreClick}) => {
  const itemList = films.map((item, index) =>
    <MovieCard
      item={item}
      key={index}
      onGenreClick={onGenreClick}
    />
  );

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
  onGenreClick: PropTypes.func
};

export default withActiveItem(FilmsList);
