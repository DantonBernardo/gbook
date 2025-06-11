import { useNavigate, useLocation } from 'react-router-dom';
import useTokenValidator from './token';
import { useEffect, useState } from 'react';

export default function Private({ children, requiredType }) {
  const navigate = useNavigate();
  const location = useLocation();
  const { isValid, isLoading, user } = useTokenValidator();
  const [isAuthorized, setIsAuthorized] = useState(false);

  useEffect(() => {
    if (!isLoading) {
      // 1. Verificação de autenticação
      if (!isValid) {
        navigate('/', { replace: true, state: { from: location.pathname } });
        return;
      }

      // 4. Se passou em todas verificações
      setIsAuthorized(true);
    }
  }, [isValid, isLoading, user, requiredType, navigate, location]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!isAuthorized) {
    return null;
  }

  return children;
}