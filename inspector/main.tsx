import React from 'react';

import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';

import { AtomProvider } from './hooks';
import { App } from './app';

ReactDOM.render(
  <BrowserRouter>
    <AtomProvider>
      <App/>
    </AtomProvider>
  </BrowserRouter>, document.getElementById('app-element'));
