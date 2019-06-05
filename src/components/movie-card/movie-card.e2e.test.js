import React from 'react';
import {configure, mount} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import MovieCard from './movie-card.jsx';

configure({adapter: new Adapter()});

const mock = {
  film: {
    id: 1,
    name: `John Wick`,
    genre: `Action`,
    poster: `img/fantastic-beasts-the-crimes-of-grindelwald.jpg`,
    preview: `https://download.blender.org/durian/trailer/sintel_trailer-480p.mp4`
  },
  onClick: jest.fn()
};

window.HTMLMediaElement.prototype.play = () => {};
window.HTMLMediaElement.prototype.pause = () => {};

describe(`MovieCard component`, () => {
  const {film} = mock;
  const handleClick = jest.fn();

  it(`reacts correctly to clicking the link`, () => {
    const movieCard = mount(
        <MovieCard
          item={film}
          onGenreClick={handleClick}
        />
    );

    const titleLink = movieCard.find(`.small-movie-card__link`);

    titleLink.simulate(`click`, {preventDefault() {}});

    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it(`When you hover the cursor on the card plays video.`, () => {
    jest.useFakeTimers();

    const movieCard = mount(<MovieCard
      item={film}
      onClick={handleClick}
    />);

    const link = movieCard.find(`.small-movie-card__link`);

    link.simulate(`click`);

    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
