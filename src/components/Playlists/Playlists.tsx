import React from 'react';
import {Link} from 'react-router-dom';

import {PLAYLISTS} from 'consts';
import css from './Playlists.module.css';

const Playlists: React.FC = () => (
  <section>
    <ul className={css.list}>
      {PLAYLISTS.map((playlist) => (
        <li key={playlist.id}>
          <Link to={`/playlist/${playlist.id}`}>{playlist.name}</Link>
        </li>
      ))}
    </ul>
  </section>
);

export default Playlists;
