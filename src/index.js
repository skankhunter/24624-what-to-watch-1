import React from 'react';
import ReactDOM from 'react-dom';
import {createStore} from "redux";
import {Provider} from "react-redux";
import {reducer} from "./reducer";

import App from './components/app/app.jsx';
import genres from './mocks/genres';

const init = () => {
  const store = createStore(reducer);

  ReactDOM.render(
      <Provider store={store}>
        <App
          genres={genres}/>
      </Provider>,
      document.querySelector(`#root`)
  );
};

init();
