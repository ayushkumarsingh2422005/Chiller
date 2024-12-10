import { useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../context/UserContext';
import { OrganizationContext } from '../context/OrganizationContext';
import { CircularProgress, Box } from '@mui/material';

export const ProtectedRoute = ({ children }) => {
  const navigate = useNavigate();
  const { isUserAvailable, loading: userLoading } = useContext(UserContext);
  const { isOrganizationAvailable, loading: orgLoading } = useContext(OrganizationContext);
  const path = window.location.pathname;

  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        // No token, redirect to auth
        if (path.startsWith('/user')) {
          navigate('/user/auth');
        } else if (path.startsWith('/organization')) {
          navigate('/organization/auth');
        }
        return;
      }

      // Wait for data to load before making decisions
      if (userLoading || orgLoading) return;

      // Check authentication based on route
      if (path.startsWith('/user') && !isUserAvailable) {
        localStorage.removeItem('token');
        navigate('/user/auth');
      } else if (path.startsWith('/organization') && !isOrganizationAvailable) {
        localStorage.removeItem('token');
        navigate('/organization/auth');
      }
    };

    checkAuth();
  }, [navigate, isUserAvailable, isOrganizationAvailable, userLoading, orgLoading, path]);

  // Show loading while checking authentication
  if (userLoading || orgLoading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  return children;
}; 