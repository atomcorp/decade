/* eslint-disable @typescript-eslint/camelcase */
/* eslint-disable @typescript-eslint/no-use-before-define */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import request from 'request-promise-native';
import fs from 'fs';

import secrets from '../secrets.js';

const authOptions = {
  url: 'https://accounts.spotify.com/api/token',
  headers: {
    Authorization:
      'Basic ' +
      new Buffer(secrets.id + ':' + secrets.secret).toString('base64'),
  },
  form: {
    // eslint-disable-next-line @typescript-eslint/camelcase
    grant_type: 'client_credentials',
  },
  json: true,
};

const parsePlaylist = (playlist) => {
  return {
    name: playlist.name,
    id: playlist.id,
    images: playlist.images,
    tracks: playlist.tracks.items.map((item, index) => ({
      rank: index,
      artists: item.track.album.artists.map((artist) => ({name: artist.name})),
      features: item.track.artists.reduce((acc, artist) => {
        if (
          !item.track.album.artists.find(
            (albumArtist) => albumArtist.name === artist.name
          )
        ) {
          return [...acc, {name: artist.name}];
        }
        return acc;
      }, []),
      id: item.track.id,
      name: item.track.name,
      images: item.track.album.images,
    })),
  };
};

const getOptionsHof = (access_token) => (playlistId) => ({
  url: `https://api.spotify.com/v1/playlists/${playlistId}`,
  headers: {
    Authorization: 'Bearer ' + access_token,
  },
  json: true,
});

const playlistIds = [
  '3suz5U1sFKZAnB0jIQyq5w',
  '6S0N2gqj84dFlf7zjDwmim',
  '3n5yJnfKwkZSaaBYsRoB3O',
  '0dWK4F4cPcaHv7Jxgmco0l',
  '5zYnYGmdjvt1Mi0Y6URjxV',
  '426nb2ik0jRVdJHdmA9RVH',
  '23tQCP4LTxzXYkq1IX5uRZ',
  '6ar2Tjv1wy3WwZx8qucFiq',
  '42ROzUApBgyUW8nuHGP6w7',
  '1pjTl4HGhrtTB2w1WVvcqS',
  '2AQzOSsx2Rv8ofjg613Hrl',
];

const init = async () => {
  try {
    const {access_token} = await request.post(authOptions);
    const getOptions = getOptionsHof(access_token);
    const playlists = await Promise.all(
      playlistIds.map(async (playlistId, i) => {
        const playlist = await request.get(getOptions(playlistId));
        return parsePlaylist(playlist, i);
      })
    );
    playlists.forEach((playlist) => {
      fs.writeFileSync(
        `./public/playlists/${playlist.name}.json`,
        JSON.stringify(playlist, null, 2)
      );
    });
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Error: ', error);
  }
};

init();
