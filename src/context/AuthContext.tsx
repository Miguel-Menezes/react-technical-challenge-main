import { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios';

interface AuthContextType {
  token: string | null;
  login: (username: string, password: string) => Promise<boolean>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      setToken(storedToken);
    }
  }, []);

  const login = async (username: string, password: string): Promise<boolean> => {
    try {
      const res = await axios.post(
        '/api/login',
        {},
        {
          headers: {
            Authorization: 'Basic ' + btoa(`${username}:${password}`),
          },
        }
      );
      const token = res.data.token;
      const expiresIn = res.data.expires_in; // segundos

      localStorage.setItem('token', token);
      if (expiresIn) {
        const expiry = Date.now() + expiresIn * 1000;
        localStorage.setItem('token_expiry', expiry.toString());
      }

      setToken(token);
      return true;
    } catch {
      return false;
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('token_expiry');
    setToken(null);
  };

  return (
    <AuthContext.Provider value={{ token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within an AuthProvider');
  return context;
}
