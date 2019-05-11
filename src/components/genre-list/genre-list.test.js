import React from 'react';
import renderer from 'react-test-renderer';
import GenreList from './genre-list.jsx';

describe(`The application is displayed correctly.`, () => {
  it(`GenreList screen correctly renders after launch`, () => {
    const genre = `Comedies`;

    const component = renderer.create(
        <GenreList
          genre={genre}
        />
    ).toJSON();

    expect(component).toMatchSnapshot();
  });
});
