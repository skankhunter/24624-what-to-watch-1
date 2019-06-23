import React from 'react';
import renderer from 'react-test-renderer';
import MovieCard from './movie-card.jsx';

const mocks = {
  title: `title`,
  poster: `poster`,
  preview: `prev`,
  genre: `Action`,
  changeGenre: jest.fn(),
  setActiveFilm: jest.fn(),
  history: {
    push: jest.fn()
  }
};

describe(`SmallMovieCard:`, () => {
  it(`Correctly renders after relaunch`, () => {
    const tree = renderer.create(<MovieCard {...mocks} />).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
