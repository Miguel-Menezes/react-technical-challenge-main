import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { isTokenExpired } from '../utils/isTokenExpired';
import type { JSX } from 'react';

export default function ProtectedRoute({ children }: { children: JSX.Element }) {
  const { token } = useAuth();

  if (!token || isTokenExpired()) {
    return <Navigate to="/login" replace />;
  }

  return children;
}
