import { useEffect, useState } from 'react';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode'; // Import corrigido

export default function useTokenValidator() {
  const [tokenStatus, setTokenStatus] = useState({
    isValid: null,
    isLoading: true,
    error: null,
    user: null
  });

  const verifyToken = async () => {
    const token = localStorage.getItem('token');
    
    if (!token) {
      setTokenStatus({ isValid: false, isLoading: false, error: 'Token não encontrado' });
      return;
    }

    try {
      const decoded = jwtDecode(token);
      if (decoded.exp < Date.now() / 1000) {
        throw new Error('Token expirado');
      }

      const response = await axios.get(`${process.env.REACT_APP_API_URL}/verify-token`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      setTokenStatus({
        isValid: true,
        isLoading: false,
        error: null,
        user: response.data.user
      });
    } catch (error) {
      localStorage.removeItem('token');
      setTokenStatus({
        isValid: false,
        isLoading: false,
        error: error.message || 'Falha na verificação'
      });
    }
  };

  useEffect(() => {
    verifyToken();
  }, []);

  return {
    ...tokenStatus,
    revalidate: verifyToken
  };
}