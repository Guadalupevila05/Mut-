import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '../ui/Button';
import { useTheme } from '../../context/ThemeContext';
import { MoonIcon, SunIcon } from 'lucide-react';
export const TopNav = () => {
  const { isDark, toggleTheme } = useTheme();
  const location = useLocation();
  // Only show glass nav on landing, otherwise it might conflict with app shell
  const isLanding = location.pathname === '/';
  if (!isLanding) return null;
  return (
    <motion.header
      initial={{
        y: -100
      }}
      animate={{
        y: 0
      }}
      transition={{
        type: 'spring',
        stiffness: 200,
        damping: 25
      }}
      className="fixed top-0 left-0 right-0 z-50 px-4 py-4 md:px-8">
      
      <div className="max-w-7xl mx-auto glass rounded-full px-6 py-3 flex items-center justify-between">
        <Link
          to="/"
          className="font-display font-extrabold text-3xl md:text-4xl tracking-[0.18em] text-ink dark:text-warmWhite hover:text-accent transition-colors">
          
          MUTÁ
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          <Link
            to="/feed"
            className="text-sm font-medium hover:text-accent transition-colors">
            
            Explorar
          </Link>
          <Link
            to="/feed"
            className="text-sm font-medium hover:text-accent transition-colors">
            
            Categorías
          </Link>
          <Link
            to="/profile/mutacommunity"
            className="text-sm font-medium hover:text-accent transition-colors">
            
            Comunidad
          </Link>
        </nav>

        <div className="flex items-center gap-4">
          <button
            onClick={toggleTheme}
            className="p-2 rounded-full hover:bg-black/5 dark:hover:bg-white/10 transition-colors">
            
            {isDark ? <SunIcon size={20} /> : <MoonIcon size={20} />}
          </button>
          <Link to="/auth">
            <Button variant="primary" size="sm">
              Ingresar
            </Button>
          </Link>
        </div>
      </div>
    </motion.header>);

};