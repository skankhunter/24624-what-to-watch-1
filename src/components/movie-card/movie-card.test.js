import React from 'react';
import renderer from 'react-test-renderer';
import MovieCard from './movie-card.jsx';

const mocks = {
  id: 1,
  name: `John Wick`,
  genre: `Action`,
  poster: `img/fantastic-beasts-the-crimes-of-grindelwald.jpg`,
  preview: `https://download.blender.org/durian/trailer/sintel_trailer-480p.mp4`,
  functionHandler: jest.fn()
};

window.HTMLMediaElement.prototype.play = () => {};
window.HTMLMediaElement.prototype.pause = () => {};

describe(`MovieCard:`, () => {
  it(`Correctly renders after relaunch`, () => {
    const tree = renderer
      .create(
          <MovieCard
            item={mocks}
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
