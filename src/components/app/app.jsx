import React from 'react';
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {
  actionChangeGenre,
  actionChangeFilms,
  actionShowAllFilms} from "../../reducer/data/data";
import {
  getFilms,
  getGenres,
  getActiveGenre
} from "../../reducer/data/selectors";

import MainScreen from '../main-screen/main-screen.jsx';


const App = (props) => {
  const {films, genres, activeGenre, onGenreClick} = props;

  return <MainScreen
    films={films}
    genres={genres}
    activeGenre={activeGenre}
    onGenreClick={onGenreClick}
  />;
};

App.propTypes = {
  films: PropTypes.array.isRequired,
  genres: PropTypes.array.isRequired,
  activeGenre: PropTypes.string.isRequired,
  onGenreClick: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => {
  return {
    activeGenre: getActiveGenre(state),
    films: getFilms(state),
    genres: getGenres(state)
  };
};

const mapDispatchToProps = (dispatch) => ({
  onGenreClick: (newGenre) => {
    dispatch(actionChangeGenre(newGenre));
    if (newGenre === `All genres`) {
      dispatch(actionShowAllFilms());
    } else {
      dispatch(actionChangeFilms());
    }
  }
});

export {App};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(App);
