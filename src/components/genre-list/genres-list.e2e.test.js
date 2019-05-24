import React from "react";
import Enzyme, {shallow} from "enzyme";
import Adapter from "enzyme-adapter-react-16";

import GenreList from "./genre-list.jsx";

Enzyme.configure({adapter: new Adapter()});

const mocks = {
  genre: `All genres`,
  functionHandler: jest.fn()
};

describe(`GenresList:`, () => {
  it(`Genre should run callback on mouse click`, () => {
    const genresList = shallow(
        <GenreList
          activeGenre={mocks.genre}
          onGenreClick={mocks.functionHandler}
        />
    );

    const singleGenre = genresList.find(`a`).last();
    singleGenre.simulate(`click`, {preventDefault() {}});
    expect(mocks.functionHandler).toHaveBeenCalledTimes(1);
  });
});
