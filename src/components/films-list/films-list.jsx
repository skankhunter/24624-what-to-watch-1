import React from 'react';
import PropTypes from 'prop-types';
import withActiveItem from '../hocs/withActiveItem/withActiveItem.jsx';
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
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    genre: PropTypes.string.isRequired,
    background_image: PropTypes.string.isRequired,
    preview_video_link: PropTypes.string.isRequired
  })).isRequired,
  onGenreClick: PropTypes.func
};

export default withActiveItem(FilmsList);
