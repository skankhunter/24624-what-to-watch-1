import React from 'react';
import renderer from 'react-test-renderer';
import MovieCard from './movie-card.jsx';
import {BrowserRouter} from "react-router-dom";

const mocks = {
  id: 1,
  title: `John Wick`,
  genre: `Kek`,
  poster: `img/fantastic-beasts-the-crimes-of-grindelwald.jpg`,
  preview: `https://download.blender.org/durian/trailer/sintel_trailer-480p.mp4`,
  functionHandler: jest.fn()
};

describe(`SmallMovieCard:`, () => {
  it(`Correctly renders after relaunch`, () => {
    const tree = renderer
      .create(
          <BrowserRouter>
            <MovieCard
              id={mocks.id}
              title={mocks.title}
              genre={mocks.genre}
              poster={mocks.poster}
              preview={mocks.preview}
              onSmallCardEnter={mocks.functionHandler}
            />
          </BrowserRouter>
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
