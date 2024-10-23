export interface SpotifyPlaylist {
  id: string;
  name: string;
  images: { url: string }[];
  tracks: {
    total: number;
  };
}

export interface SpotifyTrack {
  id: string;
  name: string;
  uri: string;
  artists: {
    name: string;
  }[];
}

export interface AuthState {
  accessToken: string | null;
  setAccessToken: (token: string | null) => void;
}