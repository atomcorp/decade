/* eslint-disable @typescript-eslint/no-use-before-define */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import request from 'request';

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

const getMoreTracks = (options, callback, existingBody) => {
  request.get(options, function(error, response, body) {
    existingBody.tracks.items.push(...body.items);
    existingBody.tracks.next = body.next;
    getPlaylist(options, callback, existingBody);
  });
};

const getPlaylist = (options, callback, body) => {
  // if there are more tracks, call the url spotify gives us
  if (body.tracks.next) {
    getMoreTracks(
      Object.assign({}, options, {
        url: body.tracks.next,
      }),
      callback,
      body
    );
  } else {
    callback({body});
  }
};

const pl2018 = '42ROzUApBgyUW8nuHGP6w7';

const parsePlaylist = ({body}) => {
  return {
    name: body.name,
    id: body.id,
    images: body.images,
    tracks: body.tracks.items.map((item, index) => ({
      rank: index,
      artists: item.track.artists.map((artist) => ({name: artist.name})),
      id: item.track.id,
      name: item.track.name,
      images: item.track.album.images,
    })),
  };
};

const showResult = (result) => {
  console.log(JSON.stringify(parsePlaylist(result)));
};

request.post(authOptions, function(error, response, body) {
  if (!error && response.statusCode === 200) {
    // use the access token to access the Spotify Web API
    const options = {
      url: `https://api.spotify.com/v1/playlists/${pl2018}`,
      headers: {
        Authorization: 'Bearer ' + body.access_token,
      },
      json: true,
    };
    request.get(options, function(error, response, body) {
      getPlaylist(options, showResult, body);
      // res.send({body});
    });
  } else {
    console.error(error, response.statusCode);
  }
});
