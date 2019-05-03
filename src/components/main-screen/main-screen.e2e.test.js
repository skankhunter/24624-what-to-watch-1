import React from 'react';
import Enzyme, {shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import MainScreen from './main-screen.jsx';

Enzyme.configure({adapter: new Adapter()});

it(`Simulating button click`, () => {
  const clickHandler = jest.fn();
  const welcomeScreen = shallow(<MainScreen
    onClick = {clickHandler}
  />);

  const startButton = welcomeScreen.find(`.catalog__button`);
  startButton.simulate(`click`, {preventDefault() {}});
  expect(clickHandler).toHaveBeenCalledTimes(1);
});
