import React from 'react';
import { loginUrl } from '../utils/spotify';

export const Login = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-white mb-8">Spotify Playlist Randomizer</h1>
        <a
          href={loginUrl}
          className="bg-green-500 text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-green-600 transition-colors"
        >
          Login with Spotify
        </a>
      </div>
    </div>
  );
};