import React from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom';

import Playlists from 'components/Playlists/Playlists';
import Playlist from 'components/Playlist/Playlist';

const Routes: React.FC = () => (
  <BrowserRouter>
    <Switch>
      <Route path="/playlist/:playlistId">
        <Playlist />
      </Route>
      <Route>
        <Playlists />
      </Route>
    </Switch>
  </BrowserRouter>
);

export default Routes;
