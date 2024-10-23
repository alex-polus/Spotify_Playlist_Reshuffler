import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';

export const Callback = () => {
  const navigate = useNavigate();
  const setAccessToken = useAuthStore((state) => state.setAccessToken);

  useEffect(() => {
    const hash = window.location.hash
      .substring(1)
      .split('&')
      .reduce((acc: { [key: string]: string }, item) => {
        const [key, value] = item.split('=');
        acc[key] = decodeURIComponent(value);
        return acc;
      }, {});

    if (hash.access_token) {
      setAccessToken(hash.access_token);
      navigate('/dashboard');
    }
  }, [navigate, setAccessToken]);

  return <div className="text-white">Authenticating...</div>;
};