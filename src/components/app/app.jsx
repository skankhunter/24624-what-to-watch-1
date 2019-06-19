import React from 'react';
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {Switch, Route} from "react-router-dom";
import {withRouter} from "react-router";
import {compose} from "redux";
import {
  actionChangeGenre,
  actionChangeFilms,
  actionShowAllFilms,
  actionFormVisibleFilms,
  actionClearVisibleFilms,
  actionChangeActiveFilm,
  Operation,
} from "../../reducer/data/data";

import MainScreen from '../main-screen/main-screen.jsx';
import SignIn from "../signIn/signIn.jsx";
import Favorites from "../favorites/favorites.jsx";
import MoviePage from "../movie-page/movie-page.jsx";

const App = (props) => {
  const {
    authorized,
    films,
    visibleFilms,
    genres,
    activeGenre,
    changeGenre,
    onShowMoreClick,
    activeFilm,
    setActiveFilm,
    addFilmToFavorite,
  } = props;

  const homeRedirect = () => {
    setActiveFilm();
    changeGenre();
    props.history.push(`/`);
  };

  const mainProps = {
    authorized,
    films,
    visibleFilms,
    genres,
    activeGenre,
    changeGenre,
    onShowMoreClick,
    activeFilm,
    setActiveFilm,
    addFilmToFavorite
  };

  const favoritesProps = {
    authorized,
    homeRedirect,
    changeGenre,
    setActiveFilm
  };

  const filmProps = {
    authorized,
    activeFilm,
    activeGenre,
    setActiveFilm,
    changeGenre,
    visibleFilms,
    homeRedirect,
    addFilmToFavorite
  };

  return (
    <Switch>
      <Route path="/" exact render={() => <MainScreen {...mainProps} />} />
      <Route path="/login" render={() => <SignIn />} />
      <Route path="/favorites" render={() => <Favorites {...favoritesProps} />} />
      <Route path="/film/:id" render={() => <MoviePage {...filmProps} />} />
    </Switch>
  );
};

App.propTypes = {
  history: PropTypes.object,
  authorized: PropTypes.bool.isRequired,
  films: PropTypes.array.isRequired,
  genres: PropTypes.array.isRequired,
  activeGenre: PropTypes.string.isRequired,
  activeFilm: PropTypes.object.isRequired,
  visibleFilms: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired,
        genre: PropTypes.string.isRequired,
        poster: PropTypes.string.isRequired,
        preview: PropTypes.string.isRequired
      })
  ).isRequired,
  currentUser: PropTypes.shape({
    userId: PropTypes.number.isRequired,
    userEmail: PropTypes.string.isRequired,
    userName: PropTypes.string.isRequired,
    userAvatar: PropTypes.string.isRequired
  }),
  changeGenre: PropTypes.func.isRequired,
  onShowMoreClick: PropTypes.func.isRequired,
  setActiveFilm: PropTypes.func.isRequired,
  addFilmToFavorite: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => {
  return {
    activeGenre: state.data.activeGenre,
    films: state.data.films,
    activeFilm: state.data.activeFilm,
    visibleFilms: state.data.visibleFilms,
    genres: state.data.genres,
    authorized: state.user.authorized,
    currentUser: state.user.currentUser
  };
};

const mapDispatchToProps = (dispatch) => ({
  changeGenre: (newGenre = `All genres`) => {
    dispatch(actionChangeGenre(newGenre));

    if (newGenre === `All genres`) {
      dispatch(actionShowAllFilms());
    } else {
      dispatch(actionChangeFilms());
    }
    dispatch(actionClearVisibleFilms());
    dispatch(actionFormVisibleFilms());
  },
  onShowMoreClick: () => {
    dispatch(actionFormVisibleFilms());
  },
  setActiveFilm: (filmId = null) => {
    dispatch(actionChangeActiveFilm(filmId));
    dispatch(actionClearVisibleFilms());
    dispatch(actionFormVisibleFilms(filmId));
  },
  addFilmToFavorite: (filmId, filmStatus) => {
    dispatch(Operation.addFilmToFavourite(filmId, filmStatus));
  }
});

export {App};

export default compose(
    connect(
        mapStateToProps,
        mapDispatchToProps
    ),
    withRouter
)(App);
