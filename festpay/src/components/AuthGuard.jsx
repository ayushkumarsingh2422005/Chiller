import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export const AuthGuard = ({ children }) => {
  const navigate = useNavigate();
  
  useEffect(() => {
    // If token exists, redirect to dashboard
    const token = localStorage.getItem('token');
    if (token) {
      const path = window.location.pathname;
      if (path.startsWith('/user/auth')) {
        navigate('/user/dashboard');
      } else if (path.startsWith('/organization/auth')) {
        navigate('/organization/dashboard');
      }
    }
  }, [navigate]);

  return children;
}; 