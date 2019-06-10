import React from 'react';
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {Switch, Route} from "react-router-dom";
import {
  actionChangeGenre,
  actionChangeFilms,
  actionShowAllFilms} from "../../reducer/data/data";

import MainScreen from '../main-screen/main-screen.jsx';
import SignIn from "../signIn/signIn.jsx";
import Favorites from "../favorites/favorites.jsx";

const App = (props) => {
  const {
    authorized,
    films,
    genres,
    activeGenre,
    onGenreClick,
    currentUser
  } = props;

  const data = {
    authorized,
    films,
    genres,
    activeGenre,
    onGenreClick,
    userAvatar: `https://es31-server.appspot.com/` + currentUser.userAvatar,
    userName: currentUser.userName
  };

  return (
    <Switch>
      <Route path="/" exact render={() => <MainScreen {...data} />} />
      <Route path="/login" render={() => <SignIn />} />
      <Route path="/favorites" render={() => <Favorites authorized={authorized} />}
      />
    </Switch>
  );
};

App.propTypes = {
  authorized: PropTypes.bool.isRequired,
  films: PropTypes.array.isRequired,
  genres: PropTypes.array.isRequired,
  activeGenre: PropTypes.string.isRequired,
  onGenreClick: PropTypes.func.isRequired,
  currentUser: PropTypes.shape({
    userId: PropTypes.number.isRequired,
    userEmail: PropTypes.string.isRequired,
    userName: PropTypes.string.isRequired,
    userAvatar: PropTypes.string.isRequired
  })
};

const mapStateToProps = (state) => {
  return {
    activeGenre: state.data.activeGenre,
    films: state.data.films,
    genres: state.data.genres,
    authorized: state.user.authorized,
    currentUser: state.user.currentUser
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
