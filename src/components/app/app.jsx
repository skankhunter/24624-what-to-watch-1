import React from 'react';
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {Switch, Route} from "react-router-dom";
import {
  actionChangeGenre,
  actionChangeFilms,
  actionShowAllFilms,
  actionFormVisibleFilms,
  actionClearVisibleFilms,
  actionChangeActiveFilm} from "../../reducer/data/data";

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
    currentUser,
    activeFilm,
    setActiveFilm
  } = props;

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
    userAvatar: `https://es31-server.appspot.com/` + currentUser.userAvatar,
    userName: currentUser.userName
  };

  const favoritesProps = {
    authorized,
    userAvatar: `https://es31-server.appspot.com/` + currentUser.userAvatar,
    userName: currentUser.userName
  };

  const filmProps = {
    film: activeFilm,
    activeGenre,
    setActiveFilm,
    changeGenre,
    visibleFilms
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
  setActiveFilm: PropTypes.func.isRequired
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
  }
});

export {App};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(App);
