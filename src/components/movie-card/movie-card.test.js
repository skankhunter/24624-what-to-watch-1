import React from 'react';
import {create} from 'react-test-renderer';
import MovieCard from './movie-card.jsx';

const mock = {
  film: {
    title: `Avengers`,
    picture: `picture.jpg`,
  },
  onClick: jest.fn(),
  onEnter: jest.fn()
};

describe(`MovieCard component`, () => {
  it(`Card renders correctly`, () => {
    const {film, onClick, onEnter} = mock;

    const tree = create(
        <MovieCard
          item={film}
          onClick={onClick}
          onEnter={onEnter}
        />).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
