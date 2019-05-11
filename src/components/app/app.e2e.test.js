import React from 'react';
import Enzyme, {mount} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import App from './app.jsx';
import films from '../../mocks/films.js';
import genres from '../../mocks/genres.js';

Enzyme.configure({adapter: new Adapter()});

describe(`App component`, () => {
  it(`reacts correctly to clicking the title link`, () => {
    const app = mount(<App
      films={films}
      genres={genres}/>);

    const playButton = app.find(`.small-movie-card__link`);
    const filmsLength = films.length;
    expect(playButton).toHaveLength(filmsLength);
  });
});
