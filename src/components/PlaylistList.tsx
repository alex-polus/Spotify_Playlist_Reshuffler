import { useQuery } from '@tanstack/react-query';
import { spotifyApi } from '../utils/spotify';
import { SpotifyPlaylist } from '../types/spotify';
import { useAuthStore } from '../store/authStore';
import React from 'react';

interface PlaylistListProps {
  onPlaylistSelect: (playlistId: string) => void;
}

export const PlaylistList = ({ onPlaylistSelect }: PlaylistListProps) => {
  const accessToken = useAuthStore((state) => state.accessToken);

  const { data: playlists, isLoading } = useQuery({
    queryKey: ['playlists'],
    queryFn: async () => {
      const response = await spotifyApi.get<{ items: SpotifyPlaylist[] }>('/me/playlists', {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      return response.data.items;
    },
  });

  if (isLoading) return <div className="text-white">Loading playlists...</div>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
      {playlists?.map((playlist) => (
        <div
          key={playlist.id}
          className="bg-gray-800 p-4 rounded-lg cursor-pointer hover:bg-gray-700 transition-colors"
          onClick={() => onPlaylistSelect(playlist.id)}
        >
          {playlist.images[0] && (
            <img
              src={playlist.images[0].url}
              alt={playlist.name}
              className="w-full h-48 object-cover rounded-md mb-4"
            />
          )}
          <h3 className="text-white font-bold">{playlist.name}</h3>
          <p className="text-gray-400">{playlist.tracks.total} tracks</p>
        </div>
      ))}
    </div>
  );
};