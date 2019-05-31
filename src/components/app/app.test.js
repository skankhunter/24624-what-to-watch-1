import React from 'react';
import renderer from 'react-test-renderer';
import genres from "../../mocks/genres";
import {App} from './app.jsx';

const mocks = {
  films: [
    {
      id: `1`,
      title: `John Wick`,
      genre: [`Crime`],
      poster: `img/fantastic-beasts-the-crimes-of-grindelwald.jpg`,
      src: `https://download.blender.org/durian/trailer/sintel_trailer-480p.mp4`
    },
    {
      id: `2`,
      title: `Killers Bodyguard`,
      genre: [`Crime`, `Comedies`],
      poster: `img/fantastic-beasts-the-crimes-of-grindelwald.jpg`,
      src: `https://upload.wikimedia.org/wikipedia/commons/transcoded/b/b3/Big_Buck_Bunny_Trailer_400p.ogv/Big_Buck_Bunny_Trailer_400p.ogv.360p.webm`
    },
    {
      id: `3`,
      title: `Star Wars`,
      genre: [`Sci-Fi`],
      poster: `img/fantastic-beasts-the-crimes-of-grindelwald.jpg`,
      src: `https://download.blender.org/durian/trailer/sintel_trailer-480p.mp4`
    },
    {
      id: `4`,
      title: `The Grand Budapest Hotel`,
      genre: [`Dramas`, `Comedies`],
      poster: `img/fantastic-beasts-the-crimes-of-grindelwald.jpg`,
      src: `https://upload.wikimedia.org/wikipedia/commons/transcoded/b/b3/Big_Buck_Bunny_Trailer_400p.ogv/Big_Buck_Bunny_Trailer_400p.ogv.360p.webm`
    },
    {
      id: `5`,
      title: `The Cabin in the Woods`,
      genre: [`Thrillers`],
      poster: `img/fantastic-beasts-the-crimes-of-grindelwald.jpg`,
      src: `https://download.blender.org/durian/trailer/sintel_trailer-480p.mp4`
    }
  ],
  genre: `All genres`,
  functionHandler: jest.fn()
};

describe(`App:`, () => {
  it(`Correctly renders after relaunch`, () => {
    const tree = renderer
      .create(
          <App
            films={mocks.films}
            genres={genres}
            activeGenre={mocks.genre}
            onGenreClick={mocks.functionHandler}
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
