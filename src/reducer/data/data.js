const ActionType = {
  CHANGE_GENRE: `CHANGE_GENRE`,
  CHANGE_FILMS: `CHANGE_FILMS`,
  SHOW_ALL: `SHOW_ALL`,
  LOAD_FILMS: `LOAD_FILMS`,
  FORM_GENRES: `FORM_GENRES`
};

const initialState = {
  activeGenre: `All genres`,
  films: [],
  loadedFilms: [],
  genres: []
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

const Operation = {
  loadFilms: () => (dispatch, _getState, api) => {
    return api.get(`/films`).then((response) => {
      dispatch(actionLoadFilms(response.data));
      dispatch(actionFormGenres(response.data));
    });
  }
};

const formFilms = (films) => {
  return films.map((film) => {
    return {
      id: film.id,
      name: film.name,
      genre: film.genre,
      poster: film.preview_image,
      preview: film.preview_video_link
    };
  });
};

const formGenres = (films) => {
  const newGenres = [];

  films.forEach((film) => {
    if (!newGenres.some((genre) => genre === film.genre)) {
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
  actionLoadFilms,
  ActionType,
  Operation,
  reducer
};
