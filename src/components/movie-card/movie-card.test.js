import React from 'react';
import {create} from 'react-test-renderer';
import MovieCard from './movie-card.jsx';

const mock = {
  film: {
    genre: [`Dramas`, `Comedies`],
    title: `The Grand Budapest Hotel`,
    desc: `The Grand Budapest Hotel is a 2014 comedy film written and directed by Wes Anderson, from a story by Anderson and Hugo Guinness, inspired by the writings of Stefan Zweig, to whom Anderson wrote the film as a tribute.`,
    poster: `the-grand-budapest-hotel-poster.jpg`,
    src: `https://download.blender.org/durian/trailer/sintel_trailer-480p.mp4`,
    year: 2014
  },
  onClick: jest.fn(),
};

describe(`MovieCard component`, () => {
  it(`Card renders correctly`, () => {
    const {film, onClick} = mock;

    const tree = create(
        <MovieCard
          item={film}
          onClick={onClick}
        />,
        {
          createNodeMock: () => {
            return {};
          }
        }).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
