import React from 'react';
import MainScreen from '../main-screen/main-screen.jsx';

const App = () => {
  const filmsList = [`Fantastic Beasts`, `Bohemian Rhapsody`, `Macbeth`];
  return <MainScreen
    filmsList={filmsList}
  />;
};

export default App;
