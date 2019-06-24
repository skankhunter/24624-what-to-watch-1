import React from 'react';
import PropTypes from 'prop-types';
import withActiveItem from '../hocs/with-active-item/with-active-item.jsx';

const GenreList = (props) => {
  const {
    activeItem: activeGenre,
    onActiveItemChange: handelGenreClick,
    genres
  } = props;


  return (
    <ul className="catalog__genres-list">
      {genres.map((genre, index) => (
        <li
          key={index}
          className={`catalog__genres-item ${
            genre === activeGenre ? `catalog__genres-item--active` : ``
          }`}
        >
          <a
            href="#"
            onClick={(evt) => {
              evt.preventDefault();
              handelGenreClick(genre);
            }}
            className="catalog__genres-link"
          >
            {genre}
          </a>
        </li>
      ))}
    </ul>
  );
};

GenreList.propTypes = {
  genres: PropTypes.array.isRequired,
  activeItem: PropTypes.string.isRequired,
  onActiveItemChange: PropTypes.func.isRequired
};

export default withActiveItem(GenreList);
