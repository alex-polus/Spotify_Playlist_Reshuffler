import { create } from 'zustand';
import { AuthState } from '../types/spotify';

export const useAuthStore = create<AuthState>((set) => ({
  accessToken: null,
  setAccessToken: (token) => set({ accessToken: token }),
}));