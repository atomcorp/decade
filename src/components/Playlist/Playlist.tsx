import React, {useEffect, useState} from 'react';
import {useParams, Link} from 'react-router-dom';

import {playlistType} from 'types';

const defaultPlaylist = {
  name: '',
  id: '',
  images: [],
  tracks: [],
};

const Playlist: React.FC = () => {
  const [state, setState] = useState<playlistType>(defaultPlaylist);
  const [isLoading, setLoading] = useState(false);
  const {playlistId} = useParams();
  useEffect(() => {
    setLoading(true);
    const init = async (): Promise<void> => {
      try {
        const result = await fetch(`/playlists/${playlistId}.json`);
        const playlist = await result.json();
        setState(playlist);
        setLoading(false);
      } catch (error) {
        setLoading(false);
      }
    };
    init();
  }, []);
  if (isLoading) {
    return <section>Loading...</section>;
  }
  return (
    <section>
      <Link to="/">Back</Link>
      <br />
      <br />
      <b>{state.name}</b>
      <ol>
        {state.tracks.map((track) => (
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
