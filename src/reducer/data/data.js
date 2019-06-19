/* eslint camelcase: 0*/
const MAXIMUM_GENRES_NUMBER = 9;
const MAXIMUM_FILMS_PER_PACK = 20;

const ActionType = {
  CHANGE_GENRE: `CHANGE_GENRE`,
  CHANGE_FILMS: `CHANGE_FILMS`,
  SHOW_ALL: `SHOW_ALL`,
  LOAD_FILMS: `LOAD_FILMS`,
  FORM_GENRES: `FORM_GENRES`,
  FORM_VISIBLE_FILMS: `FORM_VISIBLE_FILMS`,
  CLEAR_VISIBLE_FILMS: `CLEAR_VISIBLE_FILMS`,
  CHANGE_ACTIVE_FILM: `CHANGE_ACTIVE_FILM`,
  LOAD_PROMO_FILM: `LOAD_PROMO_FILM`,
  ADD_FILM_TO_FAVORITE: `ADD_FILM_TO_FAVORITE`,
  LOAD_FAVORITE_FILMS: `LOAD_FAVORITE_FILMS`
};

const initialState = {
  activeGenre: `All genres`,
  films: [],
  loadedFilms: [],
  visibleFilms: [],
  genres: [],
  activeFilm: {},
  favoriteFilms: []
};

const actionChangeGenre = (newGenre = `All genres`) => ({
  type: ActionType.CHANGE_GENRE,
  payload: newGenre
});

const actionChangeFilms = () => {
  return {
    type: ActionType.CHANGE_FILMS
  };
};

const actionShowAllFilms = () => {
  return {
    type: ActionType.SHOW_ALL
  };
};

const actionLoadFilms = (loadedFilms) => {
  return {
    type: ActionType.LOAD_FILMS,
    payload: loadedFilms
  };
};

const actionLoadPromoFilm = (promoFilm) => {
  return {
    type: ActionType.LOAD_PROMO_FILM,
    payload: promoFilm
  };
};

const actionFormGenres = (loadedFilms) => {
  return {
    type: ActionType.FORM_GENRES,
    payload: loadedFilms
  };
};

const actionFormVisibleFilms = () => {
  return {
    type: ActionType.FORM_VISIBLE_FILMS
  };
};

const actionClearVisibleFilms = (filmId = null) => {
  return {
    type: ActionType.FORM_VISIBLE_FILMS,
    payload: filmId
  };
};

const actionChangeActiveFilm = (filmId) => {
  return {
    type: ActionType.CHANGE_ACTIVE_FILM,
    payload: filmId
  };
};

const actionLoadFavoriteFilms = (loadedFilms) => {
  return {
    type: ActionType.LOAD_FAVORITE_FILMS,
    payload: loadedFilms
  };
};

const actionAddFilmToFavorite = () => {
  return {
    type: ActionType.ADD_FILM_TO_FAVORITE
  };
};

const updateVisibleFilms = (films, currentVisibleFilms, filmId) => {
  let visibleFilms = currentVisibleFilms.slice();
  let filmsPack = films.filter((film) => film.id !== filmId);

  if (visibleFilms.length < filmsPack.length) {
    if (!visibleFilms.length) {
      if (filmsPack.length > MAXIMUM_FILMS_PER_PACK) {
        visibleFilms = filmsPack.slice(0, MAXIMUM_FILMS_PER_PACK);
      } else {
        visibleFilms = filmsPack.slice(0, filmsPack.length);
      }
    } else {
      if (visibleFilms.length + MAXIMUM_FILMS_PER_PACK >= filmsPack.length) {
        visibleFilms = visibleFilms.concat(
            filmsPack.slice(visibleFilms.length, filmsPack.length)
        );
      } else {
        visibleFilms = visibleFilms.concat(
            filmsPack.slice(
                visibleFilms.length,
                visibleFilms.length + MAXIMUM_FILMS_PER_PACK
            )
        );
      }
    }
  }

  return visibleFilms;
};

const Operation = {
  loadFilms: () => (dispatch, _getState, api) => {
    return api
      .get(`/films`)
      .then((response) => {
        dispatch(actionLoadFilms(response.data));
        dispatch(actionFormGenres(response.data));
        dispatch(actionFormVisibleFilms());
        dispatch(actionChangeActiveFilm());
      })
      .catch((error) => {
        throw new Error(`Some trouble: ${error}`);
      });
  },

  loadPromo: () => (dispatch, _getState, api) => {
    return api
      .get(`/films/promo`)
      .then((response) => {
        dispatch(actionLoadPromoFilm([response.data]));
        dispatch(actionChangeActiveFilm());
      })
      .catch((error) => {
        throw new Error(`Some trouble: ${error}`);
      });
  },

  addFilmToFavourite: (filmId, status) => (dispatch, _getState, api) => {
    return api
      .post(`/favorite/${filmId}/${status ? 0 : 1}`, {
        film_id: filmId,
        status
      })
      .then(() => {
        dispatch(actionAddFilmToFavorite());
      })
      .catch((error) => {
        throw new Error(`Some trouble: ${error}`);
      });
  },

  loadFavoriteFilms: () => (dispatch, _getState, api) => {
    return api
      .get(`/favorite`)
      .then((response) => {
        dispatch(actionLoadFavoriteFilms(response.data));
      })
      .catch((error) => {
        throw new Error(`Some trouble: ${error}`);
      });
  },
};

const formFilms = (films) => {
  return films.map((film) => {
    return {
      backgroundColor: film.background_color,
      backgroundImage: film.background_image,
      description: film.description,
      director: film.director,
      genre: film.genre,
      id: film.id,
      name: film.name,
      isFavorite: film.is_favorite,
      poster: film.preview_image,
      posterImage: film.poster_image,
      preview: film.preview_video_link,
      rating: film.rating,
      released: film.released,
      runTime: film.run_time,
      scoresCount: film.scores_count,
      starring: film.starring,
      videoLink: film.video_link};
  });
};

const formGenres = (loadedFilms) => {
  const newGenres = [];

  loadedFilms.forEach((film) => {
    if (
      !newGenres.some((genre) => genre === film.genre) &&
      newGenres.length <= MAXIMUM_GENRES_NUMBER
    ) {
      newGenres.push(film.genre);
    }
  });

  newGenres.sort();
  newGenres.unshift(`All genres`);

  return newGenres;
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.CHANGE_GENRE:
      return Object.assign({}, state, {
        activeGenre: action.payload
      });

    case ActionType.CHANGE_FILMS:
      return Object.assign({}, state, {
        films: state.loadedFilms.filter((film) => {
          return film.genre === state.activeGenre;
        })
      });

    case ActionType.SHOW_ALL:
      return Object.assign({}, state, {
        films: state.loadedFilms
      });

    case ActionType.LOAD_FILMS:
      const formedFilms = formFilms(action.payload);
      return Object.assign({}, state, {
        films: formedFilms,
        loadedFilms: formedFilms
      });

    case ActionType.LOAD_FAVORITE_FILMS:
      return Object.assign({}, state, {
        favoriteFilms: formFilms(action.payload)
      });

    case ActionType.ADD_FILM_TO_FAVORITE:
      const updatedActiveFilm = Object.assign({}, state.activeFilm);
      updatedActiveFilm.isFavorite = !updatedActiveFilm.isFavorite;

      return Object.assign({}, state, {
        activeFilm: updatedActiveFilm
      });

    case ActionType.FORM_GENRES:
      return Object.assign({}, state, {
        genres: formGenres(action.payload)
      });

    case ActionType.FORM_VISIBLE_FILMS:
      const newVisibleFilms = updateVisibleFilms(
          state.films,
          state.visibleFilms,
          action.payload
      );

      return Object.assign({}, state, {
        visibleFilms: newVisibleFilms
      });

    case ActionType.CLEAR_VISIBLE_FILMS:
      return Object.assign({}, state, {
        visibleFilms: []
      });

    case ActionType.LOAD_PROMO_FILM:
      const formedPromo = formFilms(action.payload)[0];
      return Object.assign({}, state, {
        promoFilm: formedPromo
      });

    case ActionType.CHANGE_ACTIVE_FILM:
      return Object.assign({}, state, {
        activeFilm: !action.payload
          ? state.promoFilm
          : state.loadedFilms[
              state.loadedFilms.findIndex((film) => {
                return film.id === parseInt(action.payload, 0);
              })
          ]
      });
  }

  return state;
};

export {
  formFilms,
  formGenres,
  actionChangeGenre,
  actionChangeFilms,
  actionShowAllFilms,
  actionFormGenres,
  actionFormVisibleFilms,
  actionClearVisibleFilms,
  actionChangeActiveFilm,
  actionLoadFilms,
  ActionType,
  Operation,
  reducer
};
