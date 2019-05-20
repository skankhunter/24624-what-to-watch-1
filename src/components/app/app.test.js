import React from 'react';
import renderer from 'react-test-renderer';
import App from './app';
import films from '../../mocks/films.js';
import genres from '../../mocks/genres';

it(`App correctly renders after relaunch`, () => {
  const tree = renderer
    .create(<App
      films={films}
      genres={genres}
      onClick={jest.fn()}
    />,
    {
      createNodeMock: () => {
        return {};
      }
    })
    .toJSON();

  expect(tree).toMatchSnapshot();
});
