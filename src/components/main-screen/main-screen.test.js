import React from 'react';
import renderer from 'react-test-renderer';
import MainScreen from './main-screen';

const mocks = {
  films: [
    {
      id: 1,
      name: `John Wick`,
      genre: `Crime`,
      poster: `img/fantastic-beasts-the-crimes-of-grindelwald.jpg`,
      preview: `https://download.blender.org/durian/trailer/sintel_trailer-480p.mp4`
    },
    {
      id: 2,
      name: `Killers Bodyguard`,
      genre: `Comedies`,
      poster: `img/fantastic-beasts-the-crimes-of-grindelwald.jpg`,
      preview: `https://upload.wikimedia.org/wikipedia/commons/transcoded/b/b3/Big_Buck_Bunny_Trailer_400p.ogv/Big_Buck_Bunny_Trailer_400p.ogv.360p.webm`
    },
    {
      id: 3,
      name: `Star Wars`,
      genre: `Sci-Fi`,
      poster: `img/fantastic-beasts-the-crimes-of-grindelwald.jpg`,
      preview: `https://download.blender.org/durian/trailer/sintel_trailer-480p.mp4`
    },
    {
      id: 4,
      name: `The Grand Budapest Hotel`,
      genre: `Dramas`,
      poster: `img/fantastic-beasts-the-crimes-of-grindelwald.jpg`,
      preview: `https://upload.wikimedia.org/wikipedia/commons/transcoded/b/b3/Big_Buck_Bunny_Trailer_400p.ogv/Big_Buck_Bunny_Trailer_400p.ogv.360p.webm`
    },
    {
      id: 5,
      name: `The Cabin in the Woods`,
      genre: `Thrillers`,
      poster: `img/fantastic-beasts-the-crimes-of-grindelwald.jpg`,
      preview: `https://download.blender.org/durian/trailer/sintel_trailer-480p.mp4`
    }
  ],
  genres: [
    `All genres`,
    `Comedies`,
    `Crime`,
    `Documentary`,
    `Dramas`,
    `Horror`,
    `Kids & Family`,
    `Romance`,
    `Sci-Fi`,
    `Thrillers`
  ],
  activeGenre: `All genres`,
  functionHandler: jest.fn()
};

describe(`Main:`, () => {
  it(`Correctly renders after relaunch`, () => {
    const tree = renderer
      .create(
          <MainScreen
            authorized={false}
            changeScreen={mocks.functionHandler}
            userAvatar={`ava`}
            userName={`name`}
            genres={mocks.genres}
            films={mocks.films}
            activeGenre={mocks.activeGenre}
            onGenreClick={mocks.functionHandler}
            showLogIn={mocks.functionHandler}
          />,
          {
            createNodeMock: () => {
              return {};
            }
          }
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
