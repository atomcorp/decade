export type artistType = {
  name: string;
};

export type trackType = {
  rank: number;
  artists: artistType[];
  features: artistType[];
  id: string;
  name: string;
  images: coverArtType[];
};

export type coverArtType = {
  height: number;
  url: string;
  width: number;
};

export type playlistType = {
  name: string;
  id: string;
  images: coverArtType[];
  tracks: trackType[];
};
