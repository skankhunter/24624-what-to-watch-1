import MockAdapter from "axios-mock-adapter";
import {createAPI} from "../../api";
import {
  formFilms,
  formGenres,
  actionChangeGenre,
  actionChangeFilms,
  actionShowAllFilms,
  actionLoadFilms,
  actionFormGenres,
  actionFormVisibleFilms,
  actionClearVisibleFilms,
  actionChangeActiveFilm,
  ActionType,
  Operation,
  reducer
} from "./data";
/* eslint camelcase: 0*/
const mocks = {
  loadedFilms: [
    {
      background_color: `#92918B`,
      background_image: `https://es31-server.appspot.com/wtw/static/film/background/Revenant.jpg`,
      description: `A frontiersman on a fur trading expedition in the 1820s fights for survival after being mauled by a bear and left for dead by members of his own hunting team.`,
      director: `Alejandro G. Iñárritu`,
      genre: `Action`,
      id: 1,
      is_favorite: false,
      name: `The Revenant`,
      poster_image: `https://es31-server.appspot.com/wtw/static/film/poster/Revenant.jpg`,
      preview_image: `https://es31-server.appspot.com/wtw/static/film/preview/revenant.jpg`,
      preview_video_link: `https://download.blender.org/durian/trailer/sintel_trailer-480p.mp4`,
      rating: 8,
      released: 2015,
      run_time: 156,
      scores_count: 618498,
      starring: [(`Leonardo DiCaprio`, `Tom Hardy`, `Will Poulter`)],
      video_link: `http://media.xiph.org/mango/tears_of_steel_1080p.webm`
    },
    {
      background_color: `#92918B`,
      background_image: `https://es31-server.appspot.com/wtw/static/film/background/Revenant.jpg`,
      description: `A frontiersman on a fur trading expedition in the 1820s fights for survival after being mauled by a bear and left for dead by members of his own hunting team.`,
      director: `Alejandro G. Iñárritu`,
      genre: `Drama`,
      id: 2,
      is_favorite: true,
      name: `The Revenant`,
      poster_image: `https://es31-server.appspot.com/wtw/static/film/poster/Revenant.jpg`,
      preview_image: `https://es31-server.appspot.com/wtw/static/film/preview/revenant.jpg`,
      preview_video_link: `https://download.blender.org/durian/trailer/sintel_trailer-480p.mp4`,
      rating: 8,
      released: 202115,
      run_time: 156,
      scores_count: 618498,
      starring: [(`Leonardo DiCaprio`, `Tom Hardy`, `Will Poulter`)],
      video_link: `http://media.xiph.org/mango/tears_of_steel_1080p.webm`
    },
    {
      background_color: `#92918B`,
      background_image: `https://es31-server.appspot.com/wtw/static/film/background/Revenant.jpg`,
      description: `A frontiersman on a fur trading expedition in the 1820s fights for survival after being mauled by a bear and left for dead by members of his own hunting team.`,
      director: `Alejandro G. Iñárritu`,
      genre: `Comedy`,
      id: 3,
      is_favorite: false,
      name: `The Revenasdasant`,
      poster_image: `https://es31-server.appspot.com/wtw/static/film/poster/Revenant.jpg`,
      preview_image: `https://es31-server.apasdapspot.com/wtw/static/film/preview/revenant.jpg`,
      preview_video_link: `https://download.blender.org/durian/trailer/sintel_trailer-480p.mp4`,
      rating: 8,
      released: 2015,
      run_time: 156,
      scores_count: 618498,
      starring: [(`Leonardo DiasdCaprio`, `Tomasdas Hardy`)],
      video_link: `http://media.xiph.org/mango/tears_of_steel_1080p.webm`
    }
  ],
  /* eslint-disable no-underscore-dangle */
  films: [
    {
      backgroundColor: `#92918B`,
      backgroundImage: `https://es31-server.appspot.com/wtw/static/film/background/Revenant.jpg`,
      description: `A frontiersman on a fur trading expedition in the 1820s fights for survival after being mauled by a bear and left for dead by members of his own hunting team.`,
      director: `Alejandro G. Iñárritu`,
      genre: `Action`,
      id: 1,
      isFavorite: false,
      name: `The Revenant`,
      posterImage: `https://es31-server.appspot.com/wtw/static/film/poster/Revenant.jpg`,
      poster: `https://es31-server.appspot.com/wtw/static/film/preview/revenant.jpg`,
      preview: `https://download.blender.org/durian/trailer/sintel_trailer-480p.mp4`,
      rating: 8,
      released: 2015,
      runTime: 156,
      scoresCount: 618498,
      starring: [(`Leonardo DiCaprio`, `Tom Hardy`, `Will Poulter`)],
      videoLink: `http://media.xiph.org/mango/tears_of_steel_1080p.webm`
    },
    {
      backgroundColor: `#92918B`,
      backgroundImage: `https://es31-server.appspot.com/wtw/static/film/background/Revenant.jpg`,
      description: `A frontiersman on a fur trading expedition in the 1820s fights for survival after being mauled by a bear and left for dead by members of his own hunting team.`,
      director: `Alejandro G. Iñárritu`,
      genre: `Drama`,
      id: 2,
      isFavorite: true,
      name: `The Revenant`,
      posterImage: `https://es31-server.appspot.com/wtw/static/film/poster/Revenant.jpg`,
      poster: `https://es31-server.appspot.com/wtw/static/film/preview/revenant.jpg`,
      preview: `https://download.blender.org/durian/trailer/sintel_trailer-480p.mp4`,
      rating: 8,
      released: 202115,
      runTime: 156,
      scoresCount: 618498,
      starring: [(`Leonardo DiCaprio`, `Tom Hardy`, `Will Poulter`)],
      videoLink: `http://media.xiph.org/mango/tears_of_steel_1080p.webm`
    },
    {
      backgroundColor: `#92918B`,
      backgroundImage: `https://es31-server.appspot.com/wtw/static/film/background/Revenant.jpg`,
      description: `A frontiersman on a fur trading expedition in the 1820s fights for survival after being mauled by a bear and left for dead by members of his own hunting team.`,
      director: `Alejandro G. Iñárritu`,
      genre: `Comedy`,
      id: 3,
      isFavorite: false,
      name: `The Revenasdasant`,
      posterImage: `https://es31-server.appspot.com/wtw/static/film/poster/Revenant.jpg`,
      poster: `https://es31-server.apasdapspot.com/wtw/static/film/preview/revenant.jpg`,
      preview: `https://download.blender.org/durian/trailer/sintel_trailer-480p.mp4`,
      rating: 8,
      released: 2015,
      runTime: 156,
      scoresCount: 618498,
      starring: [(`Leonardo DiasdCaprio`, `Tomasdas Hardy`)],
      videoLink: `http://media.xiph.org/mango/tears_of_steel_1080p.webm`
    }
  ]
  /* eslint-enable */
};

describe(`Business logic is correct`, () => {
  it(`Form films array of objects after loaded data`, () => {
    expect(formFilms(mocks.loadedFilms)).toEqual(mocks.films);
  });

  it(`Form sorted genres array with All genres at first place after films loaded`, () => {
    expect(formGenres(mocks.loadedFilms)).toEqual([
      `All genres`,
      `Action`,
      `Comedy`,
      `Drama`
    ]);
  });
});

describe(`Action creators work correctly`, () => {
  it(`Action creator for changing genre returns correct action`, () => {
    expect(actionChangeGenre()).toEqual({
      type: `CHANGE_GENRE`,
      payload: `All genres`
    });
  });

  it(`Action creator for changing genre returns payload with new genre`, () => {
    expect(actionChangeGenre(`Some genre`)).toEqual({
      type: `CHANGE_GENRE`,
      payload: `Some genre`
    });
  });

  it(`Action creator for changing films returns correct action`, () => {
    expect(actionChangeFilms()).toEqual({
      type: `CHANGE_FILMS`
    });
  });

  it(`Action creator for showing all films returns correct action`, () => {
    expect(actionShowAllFilms()).toEqual({
      type: `SHOW_ALL`
    });
  });

  it(`Action creator for loading films returns correct action`, () => {
    expect(actionLoadFilms([])).toEqual({
      type: ActionType.LOAD_FILMS,
      payload: []
    });
  });

  it(`Action creator for loading films returns payload with new films`, () => {
    expect(actionLoadFilms(mocks.loadedFilms)).toEqual({
      type: ActionType.LOAD_FILMS,
      payload: mocks.loadedFilms
    });
  });

  it(`Action creator for forming genres array returns correct action`, () => {
    expect(actionFormGenres([])).toEqual({
      type: ActionType.FORM_GENRES,
      payload: []
    });
  });

  it(`Action creator for forming genres array returns  payload with films`, () => {
    expect(actionFormGenres(mocks.loadedFilms)).toEqual({
      type: ActionType.FORM_GENRES,
      payload: mocks.loadedFilms
    });
  });

  it(`Action creator for forming visible films retuns correct action`, () => {
    expect(actionFormVisibleFilms(2)).toEqual({
      type: ActionType.FORM_VISIBLE_FILMS,
      payload: 2
    });
  });

  it(`Action creator for forming visible films retuns payload with given value`, () => {
    expect(actionFormVisibleFilms(2)).toEqual({
      type: ActionType.FORM_VISIBLE_FILMS,
      payload: 2
    });
  });

  it(`Action creator for clearing visible films retuns correct action`, () => {
    expect(actionClearVisibleFilms()).toEqual({
      type: ActionType.CLEAR_VISIBLE_FILMS
    });
  });

  it(`Action creator for changing active films retuns correct action`, () => {
    expect(actionChangeActiveFilm(1)).toEqual({
      type: ActionType.CHANGE_ACTIVE_FILM,
      payload: 1
    });
  });

  it(`Action creator for changing active films retuns payload with given value`, () => {
    expect(actionChangeActiveFilm(3)).toEqual({
      type: ActionType.CHANGE_ACTIVE_FILM,
      payload: 3
    });
  });
});

describe(`Reducer works correctly`, () => {
  it(`Reducer without additional parameters should return initial state`, () => {
    expect(reducer(undefined, {})).toEqual({
      activeGenre: `All genres`,
      films: [],
      loadedFilms: [],
      visibleFilms: [],
      genres: [],
      activeFilm: {},
      favoriteFilms: []
    });
  });

  it(`Reducer should change genre to given value`, () => {
    expect(
        reducer(
            {
              activeGenre: `All genres`,
              films: [],
              loadedFilms: [],
              visibleFilms: [],
              genres: [],
              activeFilm: {},
              favoriteFilms: []
            },
            {
              type: ActionType.CHANGE_GENRE,
              payload: `Test Genre`
            }
        )
    ).toEqual({
      activeGenre: `Test Genre`,
      films: [],
      loadedFilms: [],
      visibleFilms: [],
      genres: [],
      activeFilm: {},
      favoriteFilms: []
    });
  });

  it(`Reducer should filter films after genre change`, () => {
    expect(
        reducer(
            {
              activeGenre: `Action`,
              films: mocks.films,
              loadedFilms: mocks.films,
              visibleFilms: [],
              genres: [],
              activeFilm: {},
              favoriteFilms: []
            },
            {
              type: ActionType.CHANGE_FILMS
            }
        )
    ).toEqual({
      activeGenre: `Action`,
      films: [
        {
          backgroundColor: `#92918B`,
          backgroundImage: `https://es31-server.appspot.com/wtw/static/film/background/Revenant.jpg`,
          description: `A frontiersman on a fur trading expedition in the 1820s fights for survival after being mauled by a bear and left for dead by members of his own hunting team.`,
          director: `Alejandro G. Iñárritu`,
          genre: `Action`,
          id: 1,
          isFavorite: false,
          name: `The Revenant`,
          posterImage: `https://es31-server.appspot.com/wtw/static/film/poster/Revenant.jpg`,
          poster: `https://es31-server.appspot.com/wtw/static/film/preview/revenant.jpg`,
          preview: `https://download.blender.org/durian/trailer/sintel_trailer-480p.mp4`,
          rating: 8,
          released: 2015,
          runTime: 156,
          scoresCount: 618498,
          starring: [(`Leonardo DiCaprio`, `Tom Hardy`, `Will Poulter`)],
          videoLink: `http://media.xiph.org/mango/tears_of_steel_1080p.webm`
        }
      ],
      loadedFilms: mocks.films,
      visibleFilms: [],
      genres: [],
      activeFilm: {},
      favoriteFilms: []
    });
  });

  it(`Reducer should all films if choosed 'All genres' genre`, () => {
    expect(
        reducer(
            {
              activeGenre: `Action`,
              films: [
                {
                  backgroundColor: `#92918B`,
                  backgroundImage: `https://es31-server.appspot.com/wtw/static/film/background/Revenant.jpg`,
                  description: `A frontiersman on a fur trading expedition in the 1820s fights for survival after being mauled by a bear and left for dead by members of his own hunting team.`,
                  director: `Alejandro G. Iñárritu`,
                  genre: `Action`,
                  id: 1,
                  isFavorite: false,
                  name: `The Revenant`,
                  posterImage: `https://es31-server.appspot.com/wtw/static/film/poster/Revenant.jpg`,
                  poster: `https://es31-server.appspot.com/wtw/static/film/preview/revenant.jpg`,
                  preview: `https://download.blender.org/durian/trailer/sintel_trailer-480p.mp4`,
                  rating: 8,
                  released: 2015,
                  runTime: 156,
                  scoresCount: 618498,
                  starring: [(`Leonardo DiCaprio`, `Tom Hardy`, `Will Poulter`)],
                  videoLink: `http://media.xiph.org/mango/tears_of_steel_1080p.webm`
                }
              ],
              loadedFilms: mocks.films,
              visibleFilms: [],
              genres: [],
              activeFilm: {},
              favoriteFilms: []
            },
            {
              type: `SHOW_ALL`
            }
        )
    ).toEqual({
      activeGenre: `Action`,
      films: mocks.films,
      loadedFilms: mocks.films,
      visibleFilms: [],
      genres: [],
      activeFilm: {},
      favoriteFilms: []
    });
  });

  it(`Reducer should should form visible films`, () => {
    expect(
        reducer(
            {
              activeGenre: `Action`,
              films: mocks.films,
              loadedFilms: mocks.films,
              visibleFilms: [],
              genres: [],
              activeFilm: {},
              favoriteFilms: []
            },
            {
              type: `FORM_VISIBLE_FILMS`,
              payload: 1
            }
        )
    ).toEqual({
      activeGenre: `Action`,
      films: mocks.films,
      loadedFilms: mocks.films,
      visibleFilms: [
        {
          backgroundColor: `#92918B`,
          backgroundImage: `https://es31-server.appspot.com/wtw/static/film/background/Revenant.jpg`,
          description: `A frontiersman on a fur trading expedition in the 1820s fights for survival after being mauled by a bear and left for dead by members of his own hunting team.`,
          director: `Alejandro G. Iñárritu`,
          genre: `Drama`,
          id: 2,
          isFavorite: true,
          name: `The Revenant`,
          posterImage: `https://es31-server.appspot.com/wtw/static/film/poster/Revenant.jpg`,
          poster: `https://es31-server.appspot.com/wtw/static/film/preview/revenant.jpg`,
          preview: `https://download.blender.org/durian/trailer/sintel_trailer-480p.mp4`,
          rating: 8,
          released: 202115,
          runTime: 156,
          scoresCount: 618498,
          starring: [(`Leonardo DiCaprio`, `Tom Hardy`, `Will Poulter`)],
          videoLink: `http://media.xiph.org/mango/tears_of_steel_1080p.webm`
        },
        {
          backgroundColor: `#92918B`,
          backgroundImage: `https://es31-server.appspot.com/wtw/static/film/background/Revenant.jpg`,
          description: `A frontiersman on a fur trading expedition in the 1820s fights for survival after being mauled by a bear and left for dead by members of his own hunting team.`,
          director: `Alejandro G. Iñárritu`,
          genre: `Comedy`,
          id: 3,
          isFavorite: false,
          name: `The Revenasdasant`,
          posterImage: `https://es31-server.appspot.com/wtw/static/film/poster/Revenant.jpg`,
          poster: `https://es31-server.apasdapspot.com/wtw/static/film/preview/revenant.jpg`,
          preview: `https://download.blender.org/durian/trailer/sintel_trailer-480p.mp4`,
          rating: 8,
          released: 2015,
          runTime: 156,
          scoresCount: 618498,
          starring: [(`Leonardo DiasdCaprio`, `Tomasdas Hardy`)],
          videoLink: `http://media.xiph.org/mango/tears_of_steel_1080p.webm`
        }
      ],
      genres: [],
      activeFilm: {},
      favoriteFilms: []
    });
  });

  it(`Reducer should should clear visible films`, () => {
    expect(
        reducer(
            {
              activeGenre: `Action`,
              films: mocks.films,
              loadedFilms: mocks.films,
              visibleFilms: mocks.films,
              genres: [],
              activeFilm: {},
              favoriteFilms: []
            },
            {
              type: `CLEAR_VISIBLE_FILMS`
            }
        )
    ).toEqual({
      activeGenre: `Action`,
      films: mocks.films,
      loadedFilms: mocks.films,
      visibleFilms: [],
      genres: [],
      activeFilm: {},
      favoriteFilms: []
    });
  });

  it(`Reducer should should change active film`, () => {
    expect(
        reducer(
            {
              activeGenre: `Action`,
              films: mocks.films,
              loadedFilms: mocks.films,
              visibleFilms: [],
              genres: [],
              activeFilm: {},
              favoriteFilms: []
            },
            {
              type: `CHANGE_ACTIVE_FILM`,
              payload: 2
            }
        )
    ).toEqual({
      activeGenre: `Action`,
      films: mocks.films,
      loadedFilms: mocks.films,
      visibleFilms: [],
      genres: [],
      activeFilm: {
        backgroundColor: `#92918B`,
        backgroundImage: `https://es31-server.appspot.com/wtw/static/film/background/Revenant.jpg`,
        description: `A frontiersman on a fur trading expedition in the 1820s fights for survival after being mauled by a bear and left for dead by members of his own hunting team.`,
        director: `Alejandro G. Iñárritu`,
        genre: `Drama`,
        id: 2,
        isFavorite: true,
        name: `The Revenant`,
        posterImage: `https://es31-server.appspot.com/wtw/static/film/poster/Revenant.jpg`,
        poster: `https://es31-server.appspot.com/wtw/static/film/preview/revenant.jpg`,
        preview: `https://download.blender.org/durian/trailer/sintel_trailer-480p.mp4`,
        rating: 8,
        released: 202115,
        runTime: 156,
        scoresCount: 618498,
        starring: [(`Leonardo DiCaprio`, `Tom Hardy`, `Will Poulter`)],
        videoLink: `http://media.xiph.org/mango/tears_of_steel_1080p.webm`
      },
      favoriteFilms: []
    });
  });

  it(`Should make a correct API call to /films`, function () {
    const dispatch = jest.fn();
    const api = createAPI(dispatch);
    const apiMock = new MockAdapter(api);
    const filmsLoader = Operation.loadFilms();

    apiMock.onGet(`/films`).reply(200, [{fake: true}]);

    return filmsLoader(dispatch, jest.fn(), api).then(() => {
      expect(dispatch).toHaveBeenCalledTimes(3);
    });
  });

  it(`Should make a correct API call to /favorite`, function () {
    const dispatch = jest.fn();
    const api = createAPI(dispatch);
    const apiMock = new MockAdapter(api);
    const filmsLoader = Operation.loadFavoriteFilms();

    apiMock.onGet(`/favorite`).reply(200, [{fake: true}]);

    return filmsLoader(dispatch, jest.fn(), api).then(() => {
      expect(dispatch).toHaveBeenCalledTimes(1);
    });
  });

  it(`Should make a correct API call to /films/promo`, function () {
    const dispatch = jest.fn();
    const api = createAPI(dispatch);
    const apiMock = new MockAdapter(api);
    const filmsLoader = Operation.loadPromo();

    apiMock.onGet(`/films/promo`).reply(200, [{fake: true}]);

    return filmsLoader(dispatch, jest.fn(), api).then(() => {
      expect(dispatch).toHaveBeenCalledTimes(2);
    });
  });
});
