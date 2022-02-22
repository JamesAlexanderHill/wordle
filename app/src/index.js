import React from 'react';
import ReactDOM from 'react-dom';
import { createGlobalStyle } from 'styled-components'
import { normalize } from 'styled-normalize'
import { BrowserRouter } from "react-router-dom";

import { palette } from './util/constants';

// import App from './App';
import Game from './Game';
import reportWebVitals from './reportWebVitals';

const { black, bone } = palette;

const GlobalStyle = createGlobalStyle`
  ${normalize}

  body {
    padding: 0;
    background-color: ${black};
    color: ${bone};
    font-family: Arial, Helvetica, sans-serif;
  }
`;

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <GlobalStyle />
      {/* <App /> */}
      <Game letterCount={5} attempts={6} />
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
