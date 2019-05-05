import React from 'react';
import renderer from 'react-test-renderer';
import MainScreen from './main-screen';

it(`MainScreen correctly renders after relaunch`, () => {
  const filmsList = [`Fantastic Beasts`, `Bohemian Rhapsody`, `Macbeth`];
  const tree = renderer
    .create(<MainScreen
      filmsList = {filmsList}
    />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});
