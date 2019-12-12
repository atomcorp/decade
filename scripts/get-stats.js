/* eslint-disable @typescript-eslint/explicit-function-return-type */
import glob from 'glob';
import fs from 'fs';

const playlists = glob.sync('public/playlists/*.json');
const stats = playlists.reduce((acc, playlistPath) => {
  const buffer = fs.readFileSync(playlistPath);
  const data = JSON.parse(buffer.toString());
  data.tracks.forEach((track) => {
    track.artists.forEach((artist) => {
      const indexOfArtist = acc.findIndex(
        (accArtist) => accArtist.id === artist.id
      );
      if (indexOfArtist === -1) {
        acc.push({...artist, count: 1});
      } else {
        acc[indexOfArtist].count++;
      }
    });
  });
  return acc;
}, []);

const sort = (a, b) => {
  return b.count - a.count;
};

const filter = (artist) => {
  return artist.id !== '0LyfQWJT6nXafLPZqxe9Of'; // "various artist"
};

fs.writeFileSync(
  'public/stats.json',
  JSON.stringify(stats.sort(sort).filter(filter), null, 2)
);
