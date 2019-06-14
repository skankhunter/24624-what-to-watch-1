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
};

const initialState = {
  activeGenre: `All genres`,
  films: [],
  loadedFilms: [],
  visibleFilms: [],
  genres: [],
  activeFilm: {}
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

const actionClearVisibleFilms = () => {
  return {
    type: ActionType.CLEAR_VISIBLE_FILMS
  };
};

const actionChangeActiveFilm = (newFilmId = null) => {
  return {
    type: ActionType.CHANGE_ACTIVE_FILM,
    payload: newFilmId
  };
};

const updateVisibleFilms = (allFilms, currentVisibleFilms) => {
  let visibleFilms = currentVisibleFilms.slice();

  if (visibleFilms.length < allFilms.length) {
    if (!visibleFilms.length) {
      if (allFilms.length > MAXIMUM_FILMS_PER_PACK) {
        visibleFilms = allFilms.slice(0, MAXIMUM_FILMS_PER_PACK);
      } else {
        visibleFilms = allFilms.slice(0, allFilms.length);
      }
    } else {
      if (visibleFilms.length + MAXIMUM_FILMS_PER_PACK >= allFilms.length) {
        visibleFilms = visibleFilms.concat(
            allFilms.slice(visibleFilms.length, allFilms.length)
        );
      } else {
        visibleFilms = visibleFilms.concat(
            allFilms.slice(
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
    return api.get(`/films`).then((response) => {
      dispatch(actionLoadFilms(response.data));
      dispatch(actionFormGenres(response.data));
      dispatch(actionFormVisibleFilms());
      dispatch(actionChangeActiveFilm());
    });
  }
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

const formGenres = (films) => {
  const newGenres = [];

  films.forEach((film) => {
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

    case ActionType.FORM_GENRES:
      return Object.assign({}, state, {
        genres: formGenres(action.payload)
      });

    case ActionType.FORM_VISIBLE_FILMS:
      const newVisibleFilms = updateVisibleFilms(
          state.films,
          state.visibleFilms
      );

      return Object.assign({}, state, {
        visibleFilms: newVisibleFilms
      });

    case ActionType.CLEAR_VISIBLE_FILMS:
      return Object.assign({}, state, {
        visibleFilms: []
      });

    case ActionType.CHANGE_ACTIVE_FILM:
      return Object.assign({}, state, {
        activeFilm: !action.payload
          ? state.loadedFilms[1]
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
