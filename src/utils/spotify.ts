import axios from 'axios';

const SPOTIFY_CLIENT_ID = 'aa831fcbd023402ea9bab34bbc0d1f4d';
const REDIRECT_URI = window.location.hostname === 'localhost' 
  ? 'http://localhost:5173/callback'
  : `${window.location.origin}/callback`;
const SCOPES = [
  'playlist-read-private',
  'playlist-modify-private',
  'playlist-modify-public',
].join(' ');

export const loginUrl = `https://accounts.spotify.com/authorize?client_id=${SPOTIFY_CLIENT_ID}&response_type=token&redirect_uri=${encodeURIComponent(
  REDIRECT_URI
)}&scope=${encodeURIComponent(SCOPES)}`;

export const spotifyApi = axios.create({
  baseURL: 'https://api.spotify.com/v1',
});

export const shuffleArray = <T>(array: T[]): T[] => {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
};