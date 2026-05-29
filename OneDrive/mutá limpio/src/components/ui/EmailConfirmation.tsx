import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../../lib/supabase';
import { CheckCircle2Icon, XCircleIcon } from 'lucide-react';
import { Button } from './Button';

export const EmailConfirmation = () => {
  const navigate = useNavigate();
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');

  useEffect(() => {
    // Al cargar, Supabase debería haber procesado el hash automáticamente.
    // Solo verificamos si el usuario ya está autenticado.
    supabase.auth.getSession().then(({ data }) => {
      if (data.session) {
        setStatus('success');
      } else {
        setStatus('error');
      }
    });
  }, []);

  return (
    <div className="fixed inset-0 z-[9999] bg-white flex flex-col items-center justify-center p-6 text-center">
      {status === 'loading' && <p className="text-black">Confirmando tu cuenta...</p>}
      
      {status === 'success' && (
        <>
          <div className="w-20 h-20 bg-rose-100 rounded-full flex items-center justify-center mb-6">
            <CheckCircle2Icon className="w-10 h-10 text-rose-500" />
          </div>
          <h1 className="text-2xl font-bold text-black mb-2">¡Email confirmado!</h1>
          <p className="text-gray-600 mb-8">Tu cuenta está lista. Ya podés empezar a usar Mutá.</p>
          <Button onClick={() => navigate('/')} className="w-full max-w-[200px]">Ir a la app</Button>
        </>
      )}

      {status === 'error' && (
        <>
          <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mb-6">
            <XCircleIcon className="w-10 h-10 text-red-500" />
          </div>
          <h1 className="text-2xl font-bold text-black mb-2">Error</h1>
          <p className="text-gray-600 mb-8">No pudimos confirmar tu cuenta. Intentá de nuevo.</p>
          <Button onClick={() => navigate('/auth')} className="w-full max-w-[200px]">Volver al login</Button>
        </>
      )}
    </div>
  );
};