import React from 'react';
import {configure, mount} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import MovieCard from './movie-card.jsx';

configure({adapter: new Adapter()});

const mock = {
  film: {
    genre: [`Dramas`, `Thrillers`],
    title: `Aviator`,
    desc: ``,
    picture: `aviator.jpg`,
    year: 2016
  },
  onClick: jest.fn(),
  onEnter: jest.fn()
};

describe(`MovieCard component`, () => {
  it(`reacts correctly to clicking the play button`, () => {
    const {film, onClick, onEnter} = mock;

    const filmCard = mount(
        <MovieCard
          item={film}
          onClick={onClick}
          onEnter={onEnter}
        />
    );

    const button = filmCard.find(`button`);
    const link = filmCard.find(`a`);

    link.simulate(`click`, {
      preventDefault: onClick
    });

    button.simulate(`click`, {
      preventDefault: onClick
    });

    expect(onClick).toHaveBeenCalledTimes(2);
  });

  it(`MovieCard resends correctly item`, () => {
    const {film, onEnter} = mock;

    const handleClick = jest.fn();
    const item = mount(<MovieCard
      item={film}
      onClick={handleClick}
      onEnter={onEnter}
    />);

    const playButton = item.find(`.small-movie-card__play-btn`);
    playButton.simulate(`click`);

    expect(handleClick).toHaveBeenCalledWith(film);
  });
});
