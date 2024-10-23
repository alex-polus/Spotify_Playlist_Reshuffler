import { useState } from 'react';
import { useAuthStore } from '../store/authStore';
import { PlaylistList } from './PlaylistList';
import { spotifyApi, shuffleArray } from '../utils/spotify';
import { useMutation } from '@tanstack/react-query';
import { SpotifyTrack } from '../types/spotify';

export const Dashboard = () => {
  const [status, setStatus] = useState<string>('');
  const accessToken = useAuthStore((state) => state.accessToken);

  const randomizePlaylist = useMutation({
    mutationFn: async (playlistId: string) => {
      // Get all tracks from the playlist
      const response = await spotifyApi.get<{ items: { track: SpotifyTrack }[] }>(
        `/playlists/${playlistId}/tracks`,
        {
          headers: { Authorization: `Bearer ${accessToken}` },
        }
      );

      const tracks = response.data.items.map((item) => item.track);
      const shuffledTracks = shuffleArray(tracks);

      // Create new playlist
      const userResponse = await spotifyApi.get('/me', {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      
      const newPlaylist = await spotifyApi.post(
        `/users/${userResponse.data.id}/playlists`,
        {
          name: `Randomized Playlist ${new Date().toLocaleDateString()}`,
          description: 'Created by Spotify Playlist Randomizer',
          public: false,
        },
        {
          headers: { Authorization: `Bearer ${accessToken}` },
        }
      );

      // Add tracks to new playlist
      await spotifyApi.post(
        `/playlists/${newPlaylist.data.id}/tracks`,
        {
          uris: shuffledTracks.map((track) => track.uri),
        },
        {
          headers: { Authorization: `Bearer ${accessToken}` },
        }
      );

      return newPlaylist.data;
    },
    onSuccess: () => {
      setStatus('Playlist successfully randomized!');
    },
    onError: () => {
      setStatus('Error randomizing playlist. Please try again.');
    },
  });

  const handlePlaylistSelect = (playlistId: string) => {
    setStatus('Randomizing playlist...');
    randomizePlaylist.mutate(playlistId);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <header className="bg-gray-800 p-6">
        <h1 className="text-3xl font-bold">Spotify Playlist Randomizer</h1>
        {status && (
          <div className="mt-4 p-4 bg-gray-700 rounded-lg">
            {status}
          </div>
        )}
      </header>
      <main className="container mx-auto py-8">
        <PlaylistList onPlaylistSelect={handlePlaylistSelect} />
      </main>
    </div>
  );
};