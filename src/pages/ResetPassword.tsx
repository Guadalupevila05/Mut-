import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { Button } from '../components/ui/Button';
import { BackgroundBlobs } from '../components/layout/BackgroundBlobs';

type SessionStatus = 'checking' | 'ready' | 'expired';

export const ResetPassword = () => {
  const navigate = useNavigate();
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [status, setStatus] = useState<SessionStatus>('checking');

  // Cuando el usuario clickea el enlace del mail, supabase deja un access_token
  // en el hash de la URL. El cliente lo procesa solo (detectSessionInUrl: true)
  // y queda con sesión activa. Acá verificamos que esa sesión exista.
  useEffect(() => {
    const check = async () => {
      const { data } = await supabase.auth.getSession();
      setStatus(data.session ? 'ready' : 'expired');
    };
    // Esperamos un tick para que el cliente procese el hash de la URL.
    const t = setTimeout(check, 200);
    return () => clearTimeout(t);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (password.length < 6) {
      setError('La contraseña debe tener al menos 6 caracteres.');
      return;
    }
    if (password !== confirm) {
      setError('Las contraseñas no coinciden.');
      return;
    }
    setLoading(true);
    const { error: err } = await supabase.auth.updateUser({ password });
    setLoading(false);
    if (err) {
      setError(err.message);
      return;
    }
    navigate('/feed');
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden">
      <BackgroundBlobs />

      <div className="w-full max-w-md z-10">
        <div className="text-center mb-10">
          <Link
            to="/"
            className="font-display font-bold text-4xl tracking-widest inline-block mb-2"
          >
            MUTÁ
          </Link>
        </div>

        <div className="glass rounded-[2rem] p-8">
          <h2 className="font-display font-bold text-2xl mb-2">
            Nueva contraseña
          </h2>

          {status === 'checking' && (
            <p className="text-sm text-ink/60 dark:text-warmWhite/60">
              Validando enlace...
            </p>
          )}

          {status === 'expired' && (
            <>
              <p className="text-sm text-ink/60 dark:text-warmWhite/60 mb-6">
                El enlace expiró o no es válido. Pedí uno nuevo desde
                "¿Olvidaste tu contraseña?".
              </p>
              <Link to="/auth">
                <Button variant="outline" fullWidth>
                  Volver a ingresar
                </Button>
              </Link>
            </>
          )}

          {status === 'ready' && (
            <>
              <p className="text-sm text-ink/60 dark:text-warmWhite/60 mb-6">
                Elegí una contraseña nueva para tu cuenta.
              </p>
              <form onSubmit={handleSubmit} className="space-y-4">
                <input
                  type="password"
                  placeholder="Nueva contraseña"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  minLength={6}
                  className="w-full bg-white/50 dark:bg-darkBg/50 border border-ink/10 dark:border-white/10 rounded-xl py-3 px-4 focus:outline-none focus:ring-2 focus:ring-accent"
                />
                <input
                  type="password"
                  placeholder="Repetir contraseña"
                  value={confirm}
                  onChange={(e) => setConfirm(e.target.value)}
                  required
                  minLength={6}
                  className="w-full bg-white/50 dark:bg-darkBg/50 border border-ink/10 dark:border-white/10 rounded-xl py-3 px-4 focus:outline-none focus:ring-2 focus:ring-accent"
                />

                {error && (
                  <p className="text-sm text-red-500 bg-red-50 dark:bg-red-900/20 rounded-xl px-4 py-2">
                    {error}
                  </p>
                )}

                <Button
                  type="submit"
                  fullWidth
                  className="mt-2"
                  disabled={loading}
                >
                  {loading ? 'Guardando...' : 'Guardar contraseña'}
                </Button>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
