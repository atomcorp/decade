import React from 'react';
import {useParams, Link} from 'react-router-dom';
import {useSuspenseQuery} from 'react-fetching-library';

import {playlistType} from 'types';

const Playlist: React.FC = () => {
  const {playlistId} = useParams();
  const {payload} = useSuspenseQuery<playlistType>({
    method: 'GET',
    endpoint: `/playlists/${playlistId}.json`,
  });
  if (!payload) {
    return null;
  }
  return (
    <section>
      <br />
      <Link to="/">Back</Link>
      <br />
      <br />
      <b>{payload.name}</b>
      <ol>
        {payload.tracks.map((track) => (
          <li key={track.id}>
            {track.artists.map((artist) => artist.name).join(', ')} -{' '}
            {track.name}
          </li>
        ))}
      </ol>
    </section>
  );
};

export default Playlist;
