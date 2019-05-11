import React from 'react';
import renderer from 'react-test-renderer';
import FilmsList from './films-list.jsx';
import films from '../../mocks/films';

describe(`The application is displayed correctly.`, () => {
  it(`FilmsList screen correctly renders after launch`, () => {
    const handleClick = jest.fn();

    const component = renderer.create(
        <FilmsList
          films={films}
          onClick={handleClick}
          onEnter={handleClick}
        />
    ).toJSON();

    expect(component).toMatchSnapshot();
  });
});
