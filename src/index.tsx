/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import ReactDOM from 'react-dom';
import {
  createClient,
  ClientContextProvider,
  QueryResponse,
  createCache,
} from 'react-fetching-library';

import Home from 'components/Home/Home';
import './index.css';

import * as serviceWorker from './serviceWorker';

const cache = createCache(
  (action) => {
    return action.method === 'GET';
  },
  (response: QueryResponse & {timestamp: number}) => {
    return new Date().getTime() - response.timestamp < 10000;
  }
);

const client = createClient({cacheProvider: cache});

ReactDOM.render(
  <ClientContextProvider client={client}>
    <Home />
  </ClientContextProvider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
