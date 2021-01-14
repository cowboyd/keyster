import React from 'react';

import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';

import { AtomProvider } from './hooks';
import { Routes } from './routes';

ReactDOM.render(
  <BrowserRouter>
    <AtomProvider>
      <Routes />
    </AtomProvider>
  </BrowserRouter>, document.getElementById('app-element'));
