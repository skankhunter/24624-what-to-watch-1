import React from 'react';
import MainScreen from '../main-screen/main-screen.jsx';

const App = () => {
  const emptyClick = (evt) => {
    evt.preventDefault();
  };

  return <MainScreen
    onClick = {emptyClick}
  />;
};

export default App;
