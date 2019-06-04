import React from 'react';
import renderer from 'react-test-renderer';
import GenreList from './genre-list.jsx';

const mocks = {
  genre: `All genres`,
  functionHandler: jest.fn()
};

describe(`GenresList:`, () => {
  it(`Correctly renders after relaunch`, () => {
    const tree = renderer
      .create(
          <GenreList
            activeItem={mocks.genre}
            onGenreClick={mocks.functionHandler}
          />
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
