import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '../components/ui/Button';
import { BackgroundBlobs } from '../components/layout/BackgroundBlobs';
export const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const navigate = useNavigate();
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    navigate('/feed');
  };
  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden">
      <BackgroundBlobs />

      <div className="w-full max-w-md z-10">
        <div className="text-center mb-10">
          <Link
            to="/"
            className="font-display font-bold text-4xl tracking-widest inline-block mb-2">
            
            MUTÁ
          </Link>
          <p className="text-ink/60 dark:text-warmWhite/60">
            Vestite distinto. Mutá.
          </p>
        </div>

        <div className="glass rounded-[2rem] p-8">
          <div className="flex gap-4 mb-8 p-1 bg-black/5 dark:bg-white/5 rounded-full relative">
            <button
              onClick={() => setIsLogin(true)}
              className={`flex-1 py-2 text-sm font-medium z-10 transition-colors ${isLogin ? 'text-ink dark:text-ink' : 'text-ink/60 dark:text-warmWhite/60'}`}>
              
              Ingresar
            </button>
            <button
              onClick={() => setIsLogin(false)}
              className={`flex-1 py-2 text-sm font-medium z-10 transition-colors ${!isLogin ? 'text-ink dark:text-ink' : 'text-ink/60 dark:text-warmWhite/60'}`}>
              
              Crear cuenta
            </button>
            <motion.div
              className="absolute top-1 bottom-1 w-[calc(50%-4px)] bg-white rounded-full shadow-sm"
              animate={{
                left: isLogin ? '4px' : 'calc(50%)'
              }}
              transition={{
                type: 'spring',
                stiffness: 300,
                damping: 30
              }} />
            
          </div>

          <AnimatePresence mode="wait">
            <motion.form
              key={isLogin ? 'login' : 'register'}
              initial={{
                opacity: 0,
                x: isLogin ? -20 : 20
              }}
              animate={{
                opacity: 1,
                x: 0
              }}
              exit={{
                opacity: 0,
                x: isLogin ? 20 : -20
              }}
              transition={{
                duration: 0.2
              }}
              onSubmit={handleSubmit}
              className="space-y-4">
              
              {!isLogin &&
              <div>
                  <input
                  type="text"
                  placeholder="Nombre completo"
                  className="w-full bg-white/50 dark:bg-darkBg/50 border border-ink/10 dark:border-white/10 rounded-xl py-3 px-4 focus:outline-none focus:ring-2 focus:ring-accent" />
                
                </div>
              }
              <div>
                <input
                  type="email"
                  placeholder="Email"
                  className="w-full bg-white/50 dark:bg-darkBg/50 border border-ink/10 dark:border-white/10 rounded-xl py-3 px-4 focus:outline-none focus:ring-2 focus:ring-accent" />
                
              </div>
              <div>
                <input
                  type="password"
                  placeholder="Contraseña"
                  className="w-full bg-white/50 dark:bg-darkBg/50 border border-ink/10 dark:border-white/10 rounded-xl py-3 px-4 focus:outline-none focus:ring-2 focus:ring-accent" />
                
              </div>

              {isLogin &&
              <div className="text-right">
                  <a href="#" className="text-xs text-accent hover:underline">
                    ¿Olvidaste tu contraseña?
                  </a>
                </div>
              }

              <Button type="submit" fullWidth className="mt-6">
                {isLogin ? 'Ingresar' : 'Crear cuenta'}
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
                className="bg-white dark:bg-darkBg-alt border-ink/10 dark:border-white/10">
                
                Google
              </Button>
              <Button
                variant="outline"
                fullWidth
                className="bg-white dark:bg-darkBg-alt border-ink/10 dark:border-white/10">
                
                Apple
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>);

};