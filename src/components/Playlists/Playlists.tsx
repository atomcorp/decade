import React from 'react';
import {Link} from 'react-router-dom';

import {PLAYLISTS} from 'consts';

const Playlists: React.FC = () => (
  <section>
    <ul>
      {PLAYLISTS.map((playlist) => (
        <li key={playlist.id}>
          <Link to={`/playlist/${playlist.id}`}>{playlist.name}</Link>
        </li>
      ))}
    </ul>
  </section>
);

export default Playlists;
