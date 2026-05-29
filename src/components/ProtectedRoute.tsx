import React, { useEffect, useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { supabase } from '../lib/supabase';

type AuthStatus = 'loading' | 'authed' | 'guest';

export const ProtectedRoute = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [status, setStatus] = useState<AuthStatus>('loading');
  const location = useLocation();

  // Chequeamos la sesión SOLO al montarse. No nos suscribimos a
  // onAuthStateChange porque si lo hacemos, cuando el usuario cierra sesión
  // estando en una ruta protegida, esta ruta (que está exit-animando) reacciona
  // al cambio y dispara su propio redirect a /auth — pisando el navigate('/')
  // que hace el botón de logout. Para reentrar a una ruta protegida sin sesión
  // alcanza con un nuevo mount de ProtectedRoute (cambio de ruta), que sí
  // chequea correctamente.
  useEffect(() => {
    let active = true;
    supabase.auth.getSession().then(({ data }) => {
      if (!active) return;
      setStatus(data.session ? 'authed' : 'guest');
    });
    return () => {
      active = false;
    };
  }, []);

  if (status === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center text-sm text-ink/50 dark:text-warmWhite/50">
        Cargando...
      </div>
    );
  }

  if (status === 'guest') {
    return (
      <Navigate
        to="/auth"
        replace
        state={{ from: location.pathname + location.search }}
      />
    );
  }

  return <>{children}</>;
};
