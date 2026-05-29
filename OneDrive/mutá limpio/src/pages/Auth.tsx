import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeftIcon } from "lucide-react";
import { Button } from "../components/ui/Button";
import { BackgroundBlobs } from "../components/layout/BackgroundBlobs";
import { useAuth, supabase } from "../lib/supabase";

export const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [forgotMode, setForgotMode] = useState(false);
  const navigate = useNavigate();
  const { signIn, signUp, signInWithGoogle } = useAuth();

  // Campos del formulario
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [username, setUsername] = useState("");

  // Estado de UI
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [forgotSent, setForgotSent] = useState(false);

  const handleForgotSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (!email.trim()) {
      setError("Ingresá tu email.");
      return;
    }
    setLoading(true);
    const { error: err } = await supabase.auth.resetPasswordForEmail(
      email.trim(),
      {
        redirectTo: `${window.location.origin}/reset-password`,
      },
    );
    setLoading(false);
    if (err) {
      setError(err.message);
      return;
    }
    setForgotSent(true);
  };

  const exitForgot = () => {
    setForgotMode(false);
    setForgotSent(false);
    setError(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    if (isLogin) {
      const { error: err } = await signIn(email, password);
      if (err) {
        setError(
          err.message === "Invalid login credentials"
            ? "Email o contraseña incorrectos"
            : err.message,
        );
      } else {
        navigate("/feed");
      }
    } else {
      if (!username.trim()) {
        setError("El nombre de usuario es obligatorio");
        setLoading(false);
        return;
      }
      const { error: err } = await signUp(
        email,
        password,
        username.trim(),
        fullName,
      );
      if (err) {
        setError(
          err.message.includes("already registered")
            ? "Este email ya está registrado"
            : err.message,
        );
      } else {
        // Supabase envía mail de confirmación por defecto
        // Si lo tenés desactivado en el dashboard, ya puede navegar
        navigate("/feed");
      }
    }

    setLoading(false);
  };

  const handleGoogleLogin = async () => {
    setError(null);
    await signInWithGoogle();
    // La redirección la maneja Supabase automáticamente
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
          <p className="text-ink/60 dark:text-warmWhite/60">
            Vestite distinto. Mutá.
          </p>
        </div>

        <div className="glass rounded-[2rem] p-8">
          {forgotMode ? (
            <div>
              <button
                type="button"
                onClick={exitForgot}
                className="text-xs text-ink/60 dark:text-warmWhite/60 hover:text-ink dark:hover:text-warmWhite flex items-center gap-1 mb-6"
              >
                <ChevronLeftIcon size={14} /> Volver
              </button>

              <h2 className="font-display font-bold text-2xl mb-2">
                Recuperar contraseña
              </h2>
              <p className="text-sm text-ink/60 dark:text-warmWhite/60 mb-6">
                {forgotSent
                  ? "Te mandamos un mail con un enlace para reestablecer tu contraseña. Revisá tu bandeja de entrada (y spam)."
                  : "Ingresá tu email y te enviamos un enlace para reestablecerla."}
              </p>

              {!forgotSent && (
                <form onSubmit={handleForgotSubmit} className="space-y-4">
                  <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
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
                    {loading ? "Enviando..." : "Enviar enlace"}
                  </Button>
                </form>
              )}

              {forgotSent && (
                <Button variant="outline" fullWidth onClick={exitForgot}>
                  Volver a ingresar
                </Button>
              )}
            </div>
          ) : (
            <>
          {/* Toggle Ingresar / Crear cuenta */}
          <div className="flex gap-4 mb-8 p-1 bg-black/5 dark:bg-white/5 rounded-full relative">
            <button
              onClick={() => {
                setIsLogin(true);
                setError(null);
              }}
              className={`flex-1 py-2 text-sm font-medium z-10 transition-colors ${isLogin ? "text-ink dark:text-ink" : "text-ink/60 dark:text-warmWhite/60"}`}
            >
              Ingresar
            </button>
            <button
              onClick={() => {
                setIsLogin(false);
                setError(null);
              }}
              className={`flex-1 py-2 text-sm font-medium z-10 transition-colors ${!isLogin ? "text-ink dark:text-ink" : "text-ink/60 dark:text-warmWhite/60"}`}
            >
              Crear cuenta
            </button>
            <motion.div
              className="absolute top-1 bottom-1 w-[calc(50%-4px)] bg-white rounded-full shadow-sm"
              animate={{ left: isLogin ? "4px" : "calc(50%)" }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            />
          </div>

          <AnimatePresence mode="wait">
            <motion.form
              key={isLogin ? "login" : "register"}
              initial={{ opacity: 0, x: isLogin ? -20 : 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: isLogin ? 20 : -20 }}
              transition={{ duration: 0.2 }}
              onSubmit={handleSubmit}
              className="space-y-4"
            >
              {/* Campos solo en registro */}
              {!isLogin && (
                <>
                  <div>
                    <input
                      type="text"
                      placeholder="Nombre completo"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      className="w-full bg-white/50 dark:bg-darkBg/50 border border-ink/10 dark:border-white/10 rounded-xl py-3 px-4 focus:outline-none focus:ring-2 focus:ring-accent"
                    />
                  </div>
                  <div>
                    <input
                      type="text"
                      placeholder="Nombre de usuario (ej: martina.vintage)"
                      value={username}
                      onChange={(e) =>
                        setUsername(
                          e.target.value.toLowerCase().replace(/\s/g, "."),
                        )
                      }
                      className="w-full bg-white/50 dark:bg-darkBg/50 border border-ink/10 dark:border-white/10 rounded-xl py-3 px-4 focus:outline-none focus:ring-2 focus:ring-accent"
                    />
                  </div>
                </>
              )}

              <div>
                <input
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full bg-white/50 dark:bg-darkBg/50 border border-ink/10 dark:border-white/10 rounded-xl py-3 px-4 focus:outline-none focus:ring-2 focus:ring-accent"
                />
              </div>

              <div>
                <input
                  type="password"
                  placeholder="Contraseña"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  minLength={6}
                  className="w-full bg-white/50 dark:bg-darkBg/50 border border-ink/10 dark:border-white/10 rounded-xl py-3 px-4 focus:outline-none focus:ring-2 focus:ring-accent"
                />
              </div>

              {isLogin && (
                <div className="text-right">
                  <button
                    type="button"
                    onClick={() => {
                      setForgotMode(true);
                      setError(null);
                    }}
                    className="text-xs text-accent hover:underline"
                  >
                    ¿Olvidaste tu contraseña?
                  </button>
                </div>
              )}

              {/* Mensaje de error */}
              {error && (
                <p className="text-sm text-red-500 bg-red-50 dark:bg-red-900/20 rounded-xl px-4 py-2">
                  {error}
                </p>
              )}

              <Button
                type="submit"
                fullWidth
                className="mt-6"
                disabled={loading}
              >
                {loading
                  ? isLogin
                    ? "Ingresando..."
                    : "Creando cuenta..."
                  : isLogin
                    ? "Ingresar"
                    : "Crear cuenta"}
              </Button>
            </motion.form>
          </AnimatePresence>

          <div className="mt-8">
            <div className="relative flex items-center justify-center mb-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-ink/10 dark:border-white/10"></div>
              </div>
              <span className="relative bg-transparent px-4 text-xs text-ink/40 glass rounded-full">
                O continuá con
              </span>
            </div>

            <div className="space-y-3">
              <Button
                variant="outline"
                fullWidth
                className="bg-white dark:bg-darkBg-alt border-ink/10 dark:border-white/10 opacity-50 cursor-not-allowed"
                disabled
              >
                Google (próximamente)
              </Button>
              {/* Apple OAuth requiere configuración adicional en Supabase */}
              <Button
                variant="outline"
                fullWidth
                className="bg-white dark:bg-darkBg-alt border-ink/10 dark:border-white/10 opacity-50 cursor-not-allowed"
                disabled
              >
                Apple (próximamente)
              </Button>
            </div>
          </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
