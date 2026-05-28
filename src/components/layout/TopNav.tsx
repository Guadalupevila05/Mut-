import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '../ui/Button';

export const TopNav = () => {
  const location = useLocation();
  
  const isLanding = location.pathname === '/';
  if (!isLanding) return null;

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: 'spring', stiffness: 200, damping: 25 }}
      className="fixed top-0 left-0 right-0 z-50 px-4 py-4 md:px-8">
      
      <div className="max-w-7xl mx-auto glass rounded-full px-6 py-3 flex items-center justify-between">
        
        {/* Espacio reservado para mantener el equilibrio del layout */}
        <div className="w-16 md:w-24"></div>

        {/* Los enlaces fueron eliminados de aquí */}

        <div className="flex items-center gap-4">
          <Link to="/auth">
            <Button variant="primary" size="sm">
              Ingresar
            </Button>
          </Link>
        </div>
      </div>
    </motion.header>
  );
};