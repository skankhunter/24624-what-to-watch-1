import React from 'react';
import MainScreen from '../main-screen/main-screen.jsx';

const App = () => {
  const filmsList = [`Fantastic Beasts`, `Bohemian Rhapsody`, `Macbeth`];

  const emptyClick = (evt) => {
    evt.preventDefault();
  };

  return <MainScreen
    filmsList = {filmsList}
    onClick = {emptyClick}
  />;
};

export default App;
